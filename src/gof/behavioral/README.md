## Padrões de comportamento

<br>

> Chain Of Responsability

- Intenção dele é criar uma cadeia de objetos que recebem uma determinada solicitação.

- Um deles pode decidir fazer um tratamento ao longo dessa cadeia.

- No momento que ele trata, interrompe esse fluxo.

- É uma espécie de lista encadeada de objetos.

- Um objeto aponta para o outro. Cada um deles toma a decisão se vai realizar ou não o tratamento.

<br>

> Command

- Encapsula uma solicitação (uma chamada, uma requisição) na forma de um objeto.

- A ideia do padrão é separar quem chama de quem é chamado, encapsulando a operação dentro do objeto.

<br>

> Mediator

- Defina um objeto que encapsula como um conjunto de objetos vai interagir.

- Promove baixo acoplamento, pois um objeto não chama o outro diretamente.

- Serve para criar um canal de comunicação entre objetos.

<br>

> Mediator

- Serve para implementar uma máquina de estados e as suas transições.

- Objeto que representa estados. A intenção é permitir que o objeto altere o seu comportamento por meio de mudanças de estado interno, onde cada estado é representado por uma classe.