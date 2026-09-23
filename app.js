(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const appMode = matchMedia('(display-mode: standalone)');
  let standalone = appMode.matches || navigator.standalone;
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const embedded = /FBAN|FBAV|Instagram|Line\/|; wv\)/i.test(ua);
  let installEvent, expanded = false, installed = false;
  const snoozeKey = 'aa-install-dismissed-at';
  let snoozed = false;
  try { snoozed = Date.now() - Number(localStorage.getItem(snoozeKey) || 0) < 7 * 86400000; } catch {}
  const portrait = matchMedia('(orientation: portrait) and (pointer: coarse)');
  let dismissed = false;
  const hint = () => { $('portrait-hint').hidden = !portrait.matches || dismissed || !$('install-guide').hidden; };
  portrait.addEventListener('change', hint); hint();
  $('dismiss-hint').onclick = () => { dismissed = true; hint(); };
  $('close-menu').onclick = () => { $('app-menu').open = false; $('game').focus(); };
  // The iframe supplies the engine an actual safe viewport, keeping SDL pointer
  // coordinates and canvas aspect ratio consistent without patching Ren'Py.
  const fitKeyboard = () => {
    const v = window.visualViewport;
    if (!v) return;
    document.body.style.height = `${v.height}px`;
    document.body.style.top = `${v.offsetTop}px`;
  };
  window.visualViewport?.addEventListener('resize', fitKeyboard);
  window.visualViewport?.addEventListener('scroll', fitKeyboard);
  window.addEventListener('pageshow', fitKeyboard); fitKeyboard();
  function renderInstall() {
    const native = Boolean(installEvent) && !embedded;
    $('install').hidden = Boolean(standalone || installed || (!ios && !android && !native));
    if (standalone || installed) $('install-guide').hidden = true;
    $('install-action').hidden = expanded && !native;
    $('install-action').textContent = native ? 'Instalar' : 'Ver passos';
    $('install-steps').hidden = !expanded || native;
    $('install-note').hidden = !expanded || native;
    $('copy-install-link').hidden = !expanded || !embedded;
    $('install-later').textContent = expanded ? 'Continuar no site' : 'Agora não';
    const steps = embedded
      ? [`Abra este link no ${ios ? 'Safari' : 'Chrome'}.`, 'Abra o menu do navegador para instalar o jogo.']
      : ios
        ? ['Toque em Compartilhar (quadrado com seta para cima).', 'Toque em Adicionar à Tela de Início.', 'Mantenha Abrir como App ativado, se aparecer, e toque em Adicionar.']
        : ['Abra o menu do navegador (⋮ ou ☰).', 'Toque em Instalar app ou Adicionar à tela inicial.', 'Confirme em Instalar ou Adicionar.'];
    $('install-steps').replaceChildren(...steps.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('install-note').textContent = embedded ? 'Se não houver “Abrir no navegador”, copie o link abaixo.' : ios ? 'Se a opção não aparecer, abra este site no Safari. Em Compartilhar, role a lista para baixo.' : 'Se a opção não aparecer, abra este site no Chrome.';
    hint();
  }
  function showInstall() {
    if (standalone || installed) return;
    $('app-menu').open = false;
    $('install-guide').hidden = false;
    renderInstall();
  }
  function dismissInstall() {
    snoozed = true;
    try { localStorage.setItem(snoozeKey, String(Date.now())); } catch {}
    $('install-guide').hidden = true;
    hint();
  }
  $('dismiss-install').onclick = dismissInstall;
  $('install-later').onclick = dismissInstall;
  $('install').onclick = () => { expanded = true; showInstall(); };
  $('install-action').onclick = async () => {
    if (!installEvent) { expanded = true; renderInstall(); return; }
    const promptEvent = installEvent;
    installEvent = null;
    $('install-action').disabled = true;
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === 'accepted') dismissInstall();
      else { expanded = true; }
    } catch { expanded = true; }
    finally { $('install-action').disabled = false; renderInstall(); }
  };
  $('copy-install-link').onclick = async () => {
    $('install-feedback').hidden = false;
    try { await navigator.clipboard.writeText(new URL('./', location.href).href); $('install-feedback').textContent = 'Link copiado.'; }
    catch { $('install-feedback').textContent = `Abra: ${new URL('./', location.href).href}`; }
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); installEvent = event; renderInstall();
    if ((ios || android) && !snoozed) showInstall();
  });
  window.addEventListener('appinstalled', () => { installed = true; installEvent = null; renderInstall(); });
  appMode.addEventListener('change', event => { standalone = event.matches || navigator.standalone; renderInstall(); });
  renderInstall();
  if ((ios || android) && !standalone && !snoozed) showInstall();
  let downloading = false, cancellation;
  async function download() {
    if (downloading) return;
    $('app-menu').open = true;
    if (!navigator.serviceWorker?.controller) { $('app-status').textContent = 'O modo offline ainda não está pronto. Aguarde ou reabra o aplicativo.'; return; }
    downloading = true; cancellation = new AbortController();
    $('offline').disabled = true; $('cancel-download').hidden = false;
    $('download-progress').hidden = false;
    try {
      const response = await fetch('offline-catalog.json', { signal: cancellation.signal });
      if (!response.ok) throw new Error('Catálogo indisponível.');
      const catalog = await response.json();
      const cache = await caches.open(`amor-azedo-2-pwa:${new URL('./', location.href).pathname}:${catalog.version}`);
      await navigator.storage?.persist?.();
      const estimate = await navigator.storage?.estimate?.();
      let missing = 0;
      for (const file of catalog.files) {
        cancellation.signal.throwIfAborted();
        if (!await cache.match(file.url)) missing += file.size;
      }
      if (estimate?.quota && missing > estimate.quota - estimate.usage) throw new Error('Não há espaço suficiente neste navegador.');
      const total = catalog.files.reduce((n, f) => n + f.size, 0);
      let done = 0;
      $('download-progress').max = total;
      for (const file of catalog.files) {
        cancellation.signal.throwIfAborted();
        if (!await cache.match(file.url)) {
          const asset = await fetch(file.url, { signal: cancellation.signal });
          if (!asset.ok || asset.status !== 200) throw new Error('Um arquivo não pôde ser baixado. Tente novamente.');
          await cache.put(file.url, asset);
        }
        done += file.size; $('download-progress').value = done;
        $('app-status').textContent = `Baixando: ${Math.round(done / 1048576)} de ${Math.ceil(total / 1048576)} MB. Mantenha o aplicativo aberto.`;
      }
      $('app-status').textContent = 'Download completo. O jogo está disponível offline neste navegador. O sistema pode liberar esse armazenamento se faltar espaço.';
    } catch (error) {
      $('app-status').textContent = cancellation.signal.aborted ? 'Download interrompido. Você pode continuar depois.' : `Download incompleto. ${error.message} Os saves foram preservados.`;
    } finally {
      downloading = false; $('offline').disabled = false; $('cancel-download').hidden = true; $('download-progress').hidden = true;
    }
  }
  $('offline').onclick = download;
  $('cancel-download').onclick = () => cancellation?.abort();
  fetch('offline-catalog.json').then(response => response.json()).then(catalog => {
    const megabytes = Math.ceil(catalog.files.reduce((n, file) => n + file.size, 0) / 1048576);
    $('offline').textContent = `Baixar jogo offline (${megabytes.toLocaleString('pt-BR')} MB)`;
  }).catch(() => {});
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== $('game').contentWindow) return;
    if (event.data?.type === 'aa-menu') $('app-menu').open = true;
    if (event.data?.type === 'aa-download') download();
    if (event.data?.type === 'aa-cancel-download') cancellation?.abort();
  });
  async function boot() {
    if ('serviceWorker' in navigator && window.isSecureContext) {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' });
        const waiting = () => { $('app-status').textContent = 'Atualização disponível. Salve a partida e feche todas as janelas do jogo para aplicá-la na próxima abertura.'; };
        if (registration.waiting) waiting();
        registration.addEventListener('updatefound', () => registration.installing?.addEventListener('statechange', () => { if (registration.waiting) waiting(); }));
        // Give the first install a chance to control the runtime without blocking
        // online play indefinitely on a slow connection or denied storage.
        await Promise.race([navigator.serviceWorker.ready, new Promise(resolve => setTimeout(resolve, 4000))]);
      } catch { $('app-status').textContent = 'Jogo online disponível. O navegador não permitiu ativar o modo offline.'; }
    } else { $('app-status').textContent = 'Para instalar e jogar offline, abra o endereço HTTPS do jogo.'; }
    $('game').src = 'game.html';
    $('game').addEventListener('load', () => { $('boot').hidden = true; document.body.classList.add('game-loaded'); }, { once: true });
  }
  boot();
})();
