<div align="center">
<a href="" rel="noopener">
  
![Oud](https://user-images.githubusercontent.com/40190772/79008099-ebb5f680-7b5c-11ea-926d-f79f25f3e47b.png)
  
</div>

<h3 align="center">Oud Front-End</h3>

<div align="center">

[![GitHub contributors](https://img.shields.io/github/contributors/AbdallahHemdan/oudFrontend)](https://github.com/AbdallahHemdan/oudFrontend/contributors)
[![GitHub issues](https://img.shields.io/github/issues/AbdallahHemdan/oudFrontend)](https://github.com/AbdallahHemdan/oudFrontend/issues)
[![GitHub forks](https://img.shields.io/github/forks/AbdallahHemdan/oudFrontend)](https://github.com/AbdallahHemdan/oudFrontend/network)
[![GitHub stars](https://img.shields.io/github/stars/AbdallahHemdan/oudFrontend)](https://github.com/AbdallahHemdan/oudFrontend/stargazers)
[![GitHub license](https://img.shields.io/github/license/AbdallahHemdan/oudFrontend)](https://github.com/AbdallahHemdan/oudFrontend/blob/master/LICENSE)

</div>

## Table of Contents

- [About the Project](#about-the-project)
  - [Build with](#build-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running](#running)
  - [Screenshots](#screenshots)
 - [File Structure](#file-structure)
- [Unit Testing](#unit-testing)
  - [Running Unit tests](#running-unit-tests)
  - [Generating Coverage Report](#generating-coverage-report)
- [Functional Documentation](#functional-documentation)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)


## About The Project
> **Oud** is an online music streaming service which is a mimic of [Spotify](https://open.spotify.com/) with all its functionalities

### Build with
- [React JS](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Bootstrap](https://getbootstrap.com/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://enzymejs.github.io/enzyme/)
- [JSDOC](https://jsdoc.app/)
- [Json-Server](https://github.com/typicode/json-server)
- [Axios](https://github.com/axios/axios)

## Getting Started
> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructuins.

### Installation

1. **_Clone the repository_**

```sh
$ git clone https://github.com/AbdallahHemdan/oudFrontend.git
```
2. **_Navigate to repository directory_**
```sh
$ cd oudFrontend
```

3. **_Install dependencies_**

```sh
$ npm install
```

### Running

1. **_Running on development mode_**
```sh
$ npm run dev
```

2. **_Running on production mode_**
```sh
$ npm run prod
```

### Screenshots

<div align="center">
 
![image](https://user-images.githubusercontent.com/40190772/79008135-01c3b700-7b5d-11ea-85c9-9f1e166e299b.png)

<hr />

![image](https://user-images.githubusercontent.com/40190772/79008263-418a9e80-7b5d-11ea-9433-c8d7791a9b81.png)


</div>

## File Structure

    Oud-Frontend
    ├── README.md
    ├── LICENSE
    ├── CONTRIBUTING.md	
    └── oudfrontend	
        ├── node_modules
        ├── package.json
        ├── jsdoc.conf.json	
        ├── .env-cmdrc.json	
        ├── .gitignore
        ├── build
        ├── public
        │   ├── favicon.ico	
        │   ├── index.html
        │   └── manifest.json	
        └── src
            ├── assets
            │   ├── images
            │   └── fonts
            ├── api	
            |   ├── db.json	
            |   └── routes.json	
            ├── components	
            ├── config
            |   └── environment.js	
            ├── pages	
            |   ├── Account	
            |   ├── Home	
            |   ├── Profile	
            |   └── Search	
            ├── routes	
            ├── utils	
            |   └── index.js	
            ├── App.css	
            ├── App.js	
            ├── index.css	
            ├── index.js		
            └── setupTests.js

## Unit testing
> Each component in our project has its own unit test file separately eg. MusicCard.test.js

### Running Unit tests
> Run the following command.
```sh
npm run test
```

### Generating Coverage Report
> After running the following command an html version will be generated and located at coverage\index.html.
```sh
npm run test:coverage
```

## Functional Documentation
> Run the following command to generate the functional documentation report in docs/index.html
```sh
npm run docs
```

## Contributing

> Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Check out our [contributing guidelines](https://github.com/AbdallahHemdan/oudFrontend/blob/master/CONTRIBUTING.md) for ways to contribute.

## Contributors
> Thanks goes to these wonderful people in the frontend team.
<table>
  <tr>
    <td align="center">
    <a href="https://github.com/AbdallahHemdan" target="_black">
    <img src="https://avatars1.githubusercontent.com/u/40190772?s=460&v=4" width="150px;" alt="abdallah hemdan"/>
    <br />
    <sub><b>Abdallah Hemdan</b></sub></a><a href="https://github.com/AbdallahHemdan/oudFrontend/commits/master?author=AbdallahHemdan" title="Code">💻</a><a href="https://github.com/AbdallahHemdan/oudFrontend/pulls?q=is%3Apr+author%3AAbdallahHemdan" title="Reviewed Pull Requests">👀</a><br />
    </td>
    <td align="center"><a href="https://github.com/abdallahabusedo" target="_black"><img src="https://avatars3.githubusercontent.com/u/42722816?s=400&u=10a6db683dfe129001b5be9abbed7b7aa03b873c&v=4" width="150px;" alt="Abdallah Sbu Sedo"/><br /><sub><b>Abdallah Abu Sedo</b></sub></a><a href="https://github.com/AbdallahHemdan/oudFrontend/commits/master?author=abdallahabusedo" title="Code">💻</a><br /></td>
    <td align="center"><a href="https://github.com/lido22"  target="_black"><img src="https://avatars1.githubusercontent.com/u/42592954?s=400&u=db45870abcf338db379d987cf20a97df3918f740&v=4" width="150px;" alt="ahmed walid"/><br /><sub><b>Ahmed Walid</b></sub></a><a href="https://github.com/AbdallahHemdan/oudFrontend/commits/master?author=lido22" title="Code">💻</a><br /></td>
     <td align="center"><a href="https://github.com/aashrafh" target="_black"><img src="https://avatars0.githubusercontent.com/u/40968967?s=460&v=4" width="150px;" alt=""/><br /><sub><b>Ahmed Ashraf</b></sub></a><a href="https://github.com/AbdallahHemdan/oudFrontend/commits/master?author=aashrafh" title="Code">💻</a><br /></td>
     <td align="center"><a href="https://github.com/Mahboub99" target="_black"><img src="https://avatars3.githubusercontent.com/u/43186742?s=460&v=4" width="150px;" alt=""/><br /><sub><b>Ahmed Mahboub</b></sub></a><a href="https://github.com/AbdallahHemdan/oudFrontend/commits/master?author=Mahboub99" title="Code">💻</a><br /></td>
  </tr>
 </table>
 
## License

> This software is licensed under MIT License, See [License](https://github.com/AbdallahHemdan/oudFrontend/blob/master/LICENSE) for more information ©AbdallahHemdan.
