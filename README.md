## Badges

[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/trojans-ec-bn/badge.svg?branch=ch-intergrate-circleci-coveralls-184347078)](https://coveralls.io/github/atlp-rwanda/trojans-ec-bn?branch=ch-intergrate-circleci-coveralls-184347078) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/trojans-ec-bn/tree/dev.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/trojans-ec-bn/tree/dev) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

## Table of contents

- [Badges](#badges)
- [General info](#general-info)
- [Setup](#setup)

## General info

This Backend for Ecommerce Project done by Trojans

## Setup

To run this project, install it locally using npm:

```
$ git clone https://github.com/atlp-rwanda/trojans-ec-bn.git
$ npm install
$ npm start
```

### To run migrations:

```
$ npm run migrate
$ npm run down (for undo migration)
```

### To run seed for add dump data:

```
$ npm run seed
$ npm run undo-seed (for undo seed)
```

### create .env file and use variable in .env.example:

### ESlint

The ESlint is configured with prettier to format code and to enforce coding style and quality rules. To get ESlint support in the editor, you have to install it's extension.

To lint through the project you can run the command

```
$ npm run lint
```

if you neet to lint a specific file or directory, you can archieve that by running this command

```
$ npx eslint <file_name>
$ npx eslint <directory_name>
```

Eslint can automatically fix some common errors in a file, to do so you will run this command

```
$ npx eslint --fix <file_name>
```

## Setting up Docker

#### Step 1:

You have to install docker in your computer [here]("https://www.docker.com/products/docker-desktop/") is the link to download it for any OS.

#### Step 2:

For windows you need to have a feature called WSL (Window Subsytem for Linux) in your windows OS [here]("https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package") is link to have it ready for docker

#### Step 3:

After starting it write the following command to see if its installed

```
$ docker --version
$ docker ps
```

With docker ps you should see no available containers

#### Step 4:

Go to the project root and run this to make the docker up and running

```
$ docker-compose -f docker-compose.yml up -d
```

To stop it from running run

```
$ docker-compose -f docker-compose.yml down
```

Your image will now be listed by Docker:

```
$ docker images
```

To enter into the image itself use the exec command like this

```
$ docker exec -it <container-name> bash
```

To run migrations or any other script in the node project

```
$ docker exec <node-container-name> npm run <script-name>
```

## Deployment

### Render

- [Swagger](https://trojans-bn-api.onrender.com/api-docs)
- [Home](https://trojans-bn-api.onrender.com/api/v1)
