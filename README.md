# Projeto integrador 
## Introdução
Este projeto foi deselvolvido em conjunto nas disciplinas de Programação 2, Banco de dados 1 e Engenharia de Software 1 com o objetivo de entrevistar e desenvolver um sistema para uma empresa.
### Integrantes 
- Eduardo V. P. Fiorentin   - 2211100002
- Fabricio S. Maia          - 2221100005

## Estrutura do Projeto

```plaintext
├── documentação/                # Documentação do projeto
│   ├── requisitos/              # Documentos de requisitos
│   └── diagramas/               # Diagramas de arquitetura
|       ├── Arquitetura/         # Diagramas da arquitetura do sistema
│       └── Banco de dados/      # Diagramas da arquitetura do banco de dados 
├── frontend/                    # Aplicação frontend
│   ├── public/                  # Arquivos públicos
│   └── src/                     # Código-fonte do frontend
│       ├── pages/               # Páginas do aplicativo
│       ├── routes/              # Definições de rotas
│       └── shared/              # Código compartilhado
│           ├── components/      # Componentes reutilizáveis
│           ├── contexts/        # Contextos de estado global
│           └── theme/           # Configuração de temas e estilos globais
├── backend/                     # Aplicação backend
│   ├── dist/                    # Código transpilado e pronto para produção
│   └── src/                     # Código-fonte do backend
│       ├── routes/              # Definições de rotas do backend
│       ├── app.ts               # Arquivo principal de configuração da aplicação
│       └── server.ts            # Arquivo de inicialização do servidor
```

## Empresa 

**Empresa**: Escola Nobre Arte Boxe.

**Sede**: Chapecó-SC.

**Área de atuação**: Arte Marciais, especificamente Boxe.

**Negócio**:
A Escola Nobre Arte Boxe nasceu e está sediada no Brasil desde 2011, liderada pelo
treinador Andrew Mattos, visa aproveitar o poder do esporte para o desenvolvimento humano.
A escola oferece um ambiente para compartilhar, viver e expressar o seu melhor, enquanto
se envolve em uma atividade física que é significativa e gratificante. Não se trata apenas
de ficar em forma; trata-se de atingir seus objetivos e se tornar a melhor versão de si
mesmo. A missão é causar um impacto positivo na vida das pessoas por meio do esporte,
contribuindo para a cultura local.
Atualmente a escola conta com uma filial na Bélgica, onde o criador da Nobre Arte Brasil ministra aulas e conhecimento sobre o Boxe.

### FUNCIONAMENTO DA EMPRESA
A academia está aberta de segunda-feira a sábado. Atendendo clientes em dois formatos
de aulas: um os clientes participam de aulas em grupo, com mais de 2 pessoas; outro
formato são as aulas “Personal”, onde os professores atendem uma pessoa por vez. Ambos
os formatos de aula têm seus horários fixados. A academia separa um tempo no sábado
para conversar com os alunos sobre fundamentos, história e metodologias de Boxe –
chamam de “Café Marcial”.
Os interessados em participar ou praticar aulas de Boxe devem fazer o seguinte processo:
1. O cliente faz uma aula experimental (opcional);
2. Caso decidam continuar a pratica do Boxe ele se matricula;
3. Caso já chegue a academia decido a praticar Boxe vai direto para a matricula;
4. Tanto a aula experimental quanto a matricula devem ser marcados e efetivados
junto a secretaria da academia;
5. No momento da matricula o cliente opta por fazer aulas em grupo ou no formato
“personal”, ou mesmo ambos os formatos de aula;
6. Após a matricula, o cliente está apto a participar das aulas.

A metricula é realizada juntamente à secretária da academia e 
oficializada mediante a assinatura de um contrato. Neste contrato são
esclarecidos os serviços que serão prestados pela empresa, as obrigações dos clientes e o funcionamento da academia.

A academia disponibiliza aos clientes planos de aulas. Os planos são divididos entre
pagamentos anuais, semestrais e mensal. 
As aulas se dividem em formatos distintos:
1. Boxe clássico;
2. Sparing:
a. Pré Sparring;
b. Sparring Classico;
3. Boxing Fitness.

Os diferentes formatos de aula têm início as 07 horas e a última aula é ministrada a partir
das 22:45. Esses horários funcionam de segunda-feira a sexta-feira. No sábado as
aulas iniciam as 07 horas e têm seu termino as 11 horas.
A academia divide os alunos entre adultos e crianças. São considerados adultos pela
academia a partir dos 14 anos de idade, não apresentaram idade máxima para os adultos.
Os kids iniciam com 06 anos de idade indo até 13 anos completos.
O quadro de funcionários da academia atualmente é composto por:
1. 02 Secretárias;
2. 03 Professores;
3. 01 Proprietário (Atualmente residindo na Bélgica);
4. Serviços contábeis terceirizados.

De acordo com a entrevista realizada com a secretária existe dois formatos de gestão das aulas:
1. Sistema online;
2. Planilha Excel.

Em ambos os formatos o acesso aos dados pessoais dos professores e os dados financeiros
(recebimento e pagamento) é realizado somente pelas secretárias, os professores não têm
acesso ao sistema de gestão.
## PROBLEMAS E DESAFIOS
O que pudemos identificar por meio das entrevistas e também como observador
participante, pois sou aluno na academia desde o mês de fevereiro de 2024, é que existe uma grande falha de comunicação entre cliente, secretaria e professores.
Os problemas identificados ou as queixas dos entrevistados são listadas abaixo:
1. Não há controle de agendamento de aulas;
2. Falta de intuitividade no sistema atual, com funções desnecessárias e poluição
visual;
3. Relatórios gerados são confusos, com excesso de informações;
4. Problemas de conexão com a internet paralisam o sistema;
5. Pesquisa por alunos exige digitar o nome completo corretamente;
6. WhatsApp sobrecarregado com solicitações;
7. Alunos com problemas de saúde não informam, o que pode ser perigoso durante
os treinos e pode trazer problemas legais para a academia;
8. Sistema atual não avisa automaticamente sobre problemas de saúde dos alunos
9. Agendamento de aulas é manual, via planilhas.

O problema é que a relação, clientes => secretárias => professores, não segue um fluxo
bem definido e as informações acabam se dissipando, como consequência deixa os atores
(personas) descontentes. O que ocorre é que os clientes contactam os professores
diretamente para agendar aulas “Personal” e o professor esquece de avisar as secretárias.
Em outros momentos a secretárias marcam aulas de “Personal” ou reposições de aulas e
não avisam os professores. Isso acaba causando um descompasso nos processos
gerenciais.
O grande desafio é criar um sistema que torne a tríade clientes => secretárias =>
professores mais eficiente e mais transparente. Algumas sugestões dos entrevistados para e efetividade dessa relação são:
1. Criar um sistema de agendamento para os alunos, com confirmação manual
pelos professores;
2. Cadastro inicial presencial, mas com possibilidade de atualização de dados e
marcação de aulas pelos alunos no sistema;
3. Relatório claro e organizado de alunos ativos, bloqueados e ausentes;
4. Alerta automático para instrutores sobre problemas de saúde dos alunos. Essa
sugestão iria obrigar os alunos a apresentarem uma Anamnese de um Médico
especialista autorizando a prática desse esporte;
5. Relatório mensal para professores, incluindo estatísticas, feedbacks e informações
relevantes dos alunos;
6. Sistema de pagamentos online, integração com Pix e ou cartão. O pagamento em
dinheiro (espécie) deverá ser realizado somente com as secretárias;
7. Landing page para a academia;
8. Sistema de feedbacks para as aulas, com avaliação dos alunos. Esse feedback
deverá ser observado pelas secretárias e também pelos professores, e
9. Relatório de folha de pagamento detalhado por professor, para aulas coletivas e
individuais.
