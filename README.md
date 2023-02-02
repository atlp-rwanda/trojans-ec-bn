## Table of contents

- [Badges](#badges)
- [General info](#general-info)
- [Setup](#setup)

## Badges

### Coverals

[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/trojans-ec-bn/badge.svg?branch=ch-intergrate-circleci-coveralls-184347078)](https://coveralls.io/github/atlp-rwanda/trojans-ec-bn?branch=ch-intergrate-circleci-coveralls-184347078)

### CircleCi

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/trojans-ec-bn/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/trojans-ec-bn/tree/main)

### HoundCi

[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

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
