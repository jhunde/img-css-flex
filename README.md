## ⚙️ Getting Started

### Installation

#### Verify `node.js` and `npm` installation
```js
node -v
npm -v
```

#### dotenv
```js
npm install dotenv
```
### nodemon
```js
npm install nodemon --save-dev
```

#### Initialize Node & Install Dependencies 
```sh
npm init -y                 
npm i express dotenv
```
> 1. `npm init -y`: Initialize node
> 2. `npm i express dotenv`: Initialize the `dotenv` package

#### Enable ES Modules
```json
{
    "name": "img-css-flex",
    "version": "1.0.0",
    "type": "module",
    "main": "server.js",
    ...
}
```