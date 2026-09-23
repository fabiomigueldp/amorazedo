// Keep native editing gestures in the text field; only game gestures are captured.
for (const id of ['canvas', 'overlayDiv']) {
  const target = document.getElementById(id);
  target.addEventListener('touchmove', event => event.preventDefault(), { passive: false });
  target.addEventListener('gesturestart', event => event.preventDefault(), { passive: false });
}
const menuButton = document.getElementById('ContextButton');
menuButton.setAttribute('role', 'button');
menuButton.setAttribute('tabindex', '0');
menuButton.setAttribute('aria-label', 'Backup e ferramentas do jogo');
menuButton.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); menuButton.click(); }
});
const appOptions = document.createElement('a');
appOptions.href = '#';
appOptions.textContent = 'Instalação e modo offline';
appOptions.addEventListener('click', event => {
  event.preventDefault();
  menuButton.click();
  parent.postMessage({ type: 'aa-menu' }, location.origin);
});
document.getElementById('ContextMenu').prepend(appOptions);
// Route Ren'Py's optional cache actions through the checked, cancellable downloader.
window.loadCache = () => parent.postMessage({ type: 'aa-download' }, location.origin);
window.clearCache = () => parent.postMessage({ type: 'aa-cancel-download' }, location.origin);
