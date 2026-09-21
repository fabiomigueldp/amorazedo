# Amor Azedo 2 — changelog de publicação

Este arquivo registra mudanças que chegaram à distribuição web publicada. A
fonte do jogo fica fora deste checkout; esta branch contém o build estático
entregue pelo GitHub Pages.

## 0.11.1 — atualização de 21 de setembro de 2026

- Novo ramo na saída do restaurante: Feka pode respeitar a recusa de Yasmin,
  bloquear a passagem ou insistir em contato físico após ela dizer não.
- A insistência tem consequências próprias, incluindo intervenção do
  funcionário, reação de Joãozão e relatos separados na delegacia.
- O ramo acrescenta nove nós e dois finais, elevando a história a 78 nós,
  52 menus, 154 opções e 14 finais.
- `game.zip` e o catálogo PWA foram recompilados com o novo roteiro e estado.

## 0.11.1 — 21 de setembro de 2026

### Mesa conjunta

- Dezoito imagens de `arte-v14` entram no pacote web e no catálogo de download
  progressivo. Elas cobrem a união das mesas, a conversa com os quatro, o
  serviço e a refeição, o intervalo, a volta à mesa, o pudim, o empréstimo, a
  saída de Vanessa e as variantes da conta.
- A encenação usa uma mesa menor e lugares consistentes: Feka e Vanessa ficam
  frente a frente; Yasmin e Joãozão conservam seus lugares. As ações de sair,
  voltar, levantar para a foto e retirar os pratos são mostradas em sequência.
- A conversa na mesa conjunta distingue quem permanece quando chega a conta.
  As variantes de quatro, três, dois ou apenas Feka não reutilizam uma imagem
  incompatível com a presença dos personagens.

### Banco, tempo e mensagens

- O saldo inicial de Feka é R$ 120. O jantar custa R$ 180 para os dois;
  dividir custa R$ 90 a cada um. O empréstimo de Joãozão e a ajuda de Vanessa
  são de R$ 60, com prazos próprios. Transporte pago por Feka também afeta o
  saldo.
- O calendário ficcional agenda o Pix do pai na manhã seguinte e as cobranças
  das dívidas. O tempo avança pelas cenas, independentemente da velocidade de
  leitura ou de quanto tempo o celular fica aberto.
- O banco do celular mostra saldo, extrato, conta do jantar e valores a
  devolver. A devolução exige escolha e confirmação; saldo insuficiente
  impede o envio. O histórico registra pagamentos e atrasos no save.
- Mensagens aparecem no celular e em avisos discretos. Dispensar um aviso
  não marca a mensagem como lida nem altera a hora da história.
- Os antigos epílogos que afirmavam devolução automática foram substituídos
  por textos condicionais ao estado real da dívida.

### Áudio e distribuição

- As âncoras sonoras da conta e da mensagem sobre a mudança foram alinhadas
  ao roteiro. Treze cues de ações removidas, incluindo devoluções automáticas,
  saíram do manifesto; o catálogo mantém 114 assets e agora compila 169
  eventos para 69 cenas. Não foram gerados novos sons.
- `game.zip` foi recompilado da fonte 0.11.1 e o catálogo PWA passou de 444
  para 462 arquivos. O changelog continua disponível fora do pacote do jogo.

### Verificação

- Compilação e lint do Ren'Py passaram. A análise narrativa alcançou 69 nós,
  47 menus, 144 opções e 12 finais, examinando 562.681 estados equivalentes e
  1.773.908 transições.
- Passaram os testes puros do modelo financeiro e do arquivo do celular, as
  108 combinações de conversa da mesa, oito estados da foto e 96 estados da
  refeição. A auditoria de áudio decodificou 249 arquivos e conferiu 167
  âncoras editoriais. A revisão artística por escuta continua pendente.

## 0.11.0 — 18 de setembro de 2026

### Chegada ao restaurante

- A chegada deixou de assumir que Yasmin sabia que Feka estaria ali. O diálogo
  agora distingue o que Vanessa sabe: a informação prévia sobre Yasmin, a
  indicação no grupo ou somente a explicação de que elas estudaram juntas.
- Foram incluídos cinco quadros de transição (`arte-v11`): reconhecimento na
  recepção, conversa na entrada, caminhada para a mesa a dois, junção das
  mesas e o momento em que Vanessa fica sozinha quando Feka segue Yasmin.
- As três rotas passam a ser encenadas como ações consecutivas, não apenas
  como uma mudança de texto: seguir para a reserva, expor Vanessa ao juntar as
  mesas sem consultá-la ou deixá-la visivelmente para trás para conversar com
  Yasmin.

### Continuidade espacial no restaurante

- A geometria R1 passou a decidir os enquadramentos pela rota e pela troca de
  assentos. A janela e a mesa de Yasmin não trocam mais de lado sem uma ação
  que justifique a mudança.
- Foram adicionados treze quadros de `arte-v12`: quatro para a procura/olhar
  durante a refeição, seis closes da configuração inicial da mesa, um novo
  balcão e duas composições para a passagem da varanda.
- A escolha de olhar foi reescrita para nomear seu alvo: “Procurar a mesa de
  Yasmin enquanto Vanessa fala”. Na mesa inicial o alvo fica além de Vanessa;
  após a troca de cadeira (e no retorno da varanda), Feka precisa olhar por
  cima do ombro.
- A mesa conjunta preserva sua composição própria. Os novos planos da mesa a
  dois não são aplicados a ela.

### Rota de reparação e permanência

- Foram adicionados doze quadros de `arte-v13` para a rota em que o casal
  continua junto: escolha à mesa, pudim compartilhado, convite na saída,
  trajeto de carro, retorno ao quarto, conversa antes de dormir, manhã,
  café, saída para a faculdade, chegada à mudança, trabalho entre caixas e
  refeição no apartamento.
- A aproximação no carro permanece uma escolha, não uma recompensa automática:
  a conversa sobre Yasmin continua explícita e a proximidade só aparece no
  ramo que a escolhe.

### Pacote e cache web

- `game.zip` foi regenerado a partir das fontes 0.11.0 e o catálogo PWA foi
  atualizado. O catálogo adiciona 30 imagens novas (`arte-v11`, `arte-v12` e
  `arte-v13`) ao download progressivo.
- Os arquivos de áudio já publicados foram reempacotados pelo build do Ren'Py;
  esta publicação não adiciona uma nova faixa ou efeito ao catálogo PWA.
- O gerador local agora preserva este arquivo durante a sincronização do build,
  para que a documentação não seja removida por futuras compilações.

### Verificação

- O build foi criado com Ren'Py Web 8.5.3 e inclui `.nojekyll` para GitHub
  Pages.
- A validação de 18 de setembro aprovou 69 nós, 48 menus, 145 opções e 12
  finais. A análise exaustiva por equivalência verificou 569.010 estados e
  1.791.539 transições, preservando 503 blocos de diálogo.
- A auditoria de áudio aprovou 114 assets, 182 eventos de execução, 180 cues
  editoriais e 261 arquivos decodificados. A revisão artística por escuta
  permanece pendente; a aprovação acima é técnica e de integração.
- Também foram criadas 163 verificações visuais, testes nativos de menu,
  save/load, rollback e reset, e percursos de serviço/refeição/retirada.

## 0.10.1-mobile — 18 de setembro de 2026

- A variante móvel passou a reutilizar os controles de rádio, checkbox, barras,
  sliders e scrollbars disponíveis, evitando referências a diretórios móveis
  ausentes nas Preferências.
