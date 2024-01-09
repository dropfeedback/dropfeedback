<a href="https://refine.dev/">
    <img alt="dropfeedback logo" src="https://github.com/DropFeedback/dropfeedback/assets/23058882/26f35354-39d7-4295-8347-bd5f61b962f4">
</a>

<h1 align="center">
  Easiest way to reach your customers
</h1>

# Contributing

## Packages

- **web**: The admin panel.
- **api**: The API server.
- **@dropfeedback/core**: The core widget.
- **@dropfeedback/react**: The React wrapper of the core widget.

## Setting Up Your Environment

### Requirements

- Node.js version 18 or higher
- Git and GitHub account
- npm version 8 or higher
- docker and docker-compose for running the API server.

After you have installed the above requirements, you can follow the steps below to set up your environment.

### Fork

First, you need to [fork](https://github.com/DropFeedback/dropfeedback/fork) the **DropFeedback** repository to your GitHub account. You can do this by clicking the Fork button on the top right corner of the repository page.

### Clone

After you have forked the repository, you need to clone it to your local machine.

```bash
git clone https://github.com/DropFeedback/dropfeedback.git
```

### Install dependencies

After you have cloned the repository, you need to install the dependencies.

```bash
npm install
```

### Start the development server

After you have installed the dependencies, you can start the development server by running the following command. This will start the development server of each given package.

> 🚨 DropFeedback is a monorepo and managed by [Lerna](https://lerna.js.org/).

```bash
npm run dev --scope web --scope api --scope @dropfeedback/core
```

### Docker for API server's database

If you want to work with the API server, you need to start the database first. We use docker-compose to run the database on locally. You can start the database by running the following command.

```bash
docker-compose up -d
```

### .env file

For some packages can't work without an `env` file. You can find the required env file in each package's `.env.test`. You can copy and rename it to `.env` and fill in the required env variables.
