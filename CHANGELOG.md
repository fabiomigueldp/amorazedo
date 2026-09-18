# Amor Azedo 2 — changelog de publicação

Este arquivo registra mudanças que chegaram à distribuição web publicada. A
fonte do jogo fica fora deste checkout; esta branch contém o build estático
entregue pelo GitHub Pages.

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
