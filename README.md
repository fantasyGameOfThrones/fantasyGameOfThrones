# Fantasy Game of Thrones

----
## Introduction
see [Game of Thrones Wikipedia](https://en.wikipedia.org/wiki/Game_of_Thrones)
and [The Inspiration](http://www.theverge.com/2015/4/10/8382395/the-game-of-game-of-thrones-who-will-win-season-five)

This provides a platform for a Game of Thrones fantasy league.

## Tech Stack

React/Redux + Node/Express + Sequelize/MySQL

----
## Getting started (dev)
* `npm install`
* `npm install -g babel-cli`
* Check to make sure you have a database called 'got' in mysql:
  * In your terminal: `mysql -u root`
  * Then (you should now be in the mysql cli): `show databases;`
  * If you have 'got', you're fine.
  * Else, `create database got;`
  * You can now exit mysql
* In one terminal window: `npm start`
* In another terminal window: `npm run db`
* In another terminal window: `npm run watch`
* In another terminal window: `npm run dev`

Dev server should now serve files from http://localhost:4000. React components should be auto-updated, without need of browser refresh. 
Regular server will serve files from http://localhost:8000! We are using it currently as an endpoint which our dev server pings to grab data.
The database has its own server, which should be operating on port 2391.

## To use Redux Dev Tools (time travel etc)
Go to webpack.config.js and change NODE_ENV to `JSON.stringify('development')`


----
## Dependencies
* [babel-eslint](https://github.com/babel/babel-eslint)
* [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
* [bluebird](https://www.npmjs.com/package/bluebird)
* [body-parser](https://github.com/expressjs/body-parser)
* [dotenv](https://github.com/bkeepers/dotenv)
* [express](https://www.npmjs.com/package/express)
* [jwt-simple](https://www.npmjs.com/package/jwt-simple)
* [mysql](https://www.npmjs.com/package/mysql)
* [react](https://github.com/facebook/react)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-redux](https://github.com/rackt/react-redux)
* [redux](https://github.com/rackt/redux)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [request-promise](https://www.npmjs.com/package/request-promise)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [socket.io](https://www.npmjs.com/package/socket.io)
* [underscore](https://www.npmjs.com/package/underscore)

## Dev Dependencies
* [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core)
* [babel-loader](https://github.com/babel/babel-loader)
* [babel-polyfill](https://www.npmjs.com/package/babel-polyfill)
* [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)
* [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react)
* [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0)
* [chai](https://www.npmjs.com/package/chai)
* [eslint](https://www.npmjs.com/package/eslint)
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
* [mocha](https://www.npmjs.com/package/mocha)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [redux-devtools](https://github.com/gaearon/redux-devtools)
* [redux-devtools-log-monitor](https://www.npmjs.com/package/redux-devtools-dock-monitor)
* [redux-devtools-log-monitor](https://www.npmjs.com/package/redux-devtools-log-monitor)
* [webpack](https://github.com/webpack/webpack)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
