## Padrões de criação

<br>

> Abstract Factory

- Serve para criar familias de objetos com base num contrato: Arquivos factory

<br>

> Factory Method

- Define uma interface para criação de objetos permitindo que a subclasse decida qual instância deve ser criada.
- Método de fabricação de instâncias onde eu delego para a subclasse a responsabilidade por definir qual objeto será fabricado.

<br>

> Singleton: instância única

- Garante que uma classe tenha uma só instância, fornecendo um ponto de acesso global a ela.
- Exemplo: conexão com o banco de dados.
- Pode ser um antipattern em situações onde compartilha estado. Corre o risco de sobrescrever esse estado.

<br>

> Prototype: cópia de objetos

- Especifica objetos (protótipo) para servir como base na cópia de objetos.
- O javascript tem herança baseada em protótipo: novas instâncias sendo criadas com base em instâncias existentes.
    - Exemplo: criação de data. As operações de data não estão definidas no objeto criado e sim no protótipo do objeto.

<br>

> Builder

- Se aplica a objetos complexo. Separa a construção do objeto complexo da sua representação.Possivel criar objetos diferentes

- Padrão que abstrai o passo a passo de um construção complexa. Se aplica para um construtor com muitos parâmetros.