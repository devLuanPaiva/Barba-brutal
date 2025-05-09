# Barba Brutal

Barba Brutal é um sistema completo para uma barbearia com uma temática de rock clássico, onde os clientes podem realizar seus agendamentos de cortes de cabelo e barba. O projeto utiliza uma abordagem monorepo para integrar o frontend, backend e mobile, centralizando as regras de negócio em um core global utilizando a biblioteca TurboRepo.

## Funcionalidades

- **Agendamento de Serviços:** Clientes podem escolher entre diversos barbeiros (Marcão, Beto, Kathya, Sérgio, Rafa e Fernanda) e serviços (Corte Viking, Barba de Lenhador, Garras Brutais, Combo Alpha, Pequeno Caçador, e Noivo Raiz).
- **Horários de Atendimento:** Disponibilidade de horários pela manhã, tarde e noite, com slots de 15 minutos cada.
- **Confirmação de Agendamento:** Finalização do pedido e confirmação do agendamento.
- **Visualizar Agendamento:** Usuário pode saber quais agendamentos foram realizados, com detalhes como dia, horários, serviços, barbeiro e valor.

## Tecnologias Utilizadas

### Monorepo

- **TurboRepo:** Utilizado para gerenciar o monorepo, integrando todos os módulos e aplicações do projeto.

### Frontend

- **Next.js**
- **Tailwind CSS**
- **radix-ui**
- **tabler/icons-react**
- **lucide-react**
- **TypeScript**

### Backend

- **Nest.js**
- **Prisma**
- **SQLite**

### Mobile

- **React Native**
- **Expo**
- **expo/vector-icons**
- **react-native-async-storage/async-storage**
- **react-navigation**
  - bottom-tabs
  - native
  - native-stack

## 🌌 Interfaces
### Tela Inicial
![Home](https://ik.imagekit.io/p0mm3nebo/barbaBrutal/image2.png?updatedAt=1746727826238)

## Como Rodar o Projeto

### Pré-requisitos

- Node.js
- Yarn / npm

### Instalação

1. Clone o repositório:

```sh
git clone https://github.com/devLuanPaiva/Barba-brutal.git
```

2. Navege até a pasta do projeto:

```sh
cd barba-brutal
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:

   ````bash
       npm run dev
       # or
       yarn dev
       # or
       pnpm dev
       # or
       bun dev
       ```
   ````

5. Abra o navegador e acesse `http://localhost:3000`.
   This Turborepo includes the following packages/apps:

## Experiência de Aprendizado

Este projeto foi desenvolvido acompanhando a Formação Dev com o professor Leonardo Leitão. Durante o desenvolvimento, aprendi diversos conceitos de arquitetura limpa, super classes, TypeScript e boas práticas de programação, o que proporcionou uma experiência única como desenvolvedor.

## Contribuição

Se você deseja contribuir com o projeto, sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

<hr>

Desenvolvido com ❤️por Luan Alves
