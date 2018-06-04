import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import Index from './routes/index'
import router from './router'
// const app: express.Application = express()

class Server {
  public app: express.Application

  public static bootstrap(): Server {
    return new Server
  }

  private routes() {
    this.app.use(router)
  }

  constructor() {
    this.app = express()
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.engine('.html', require('ejs').__express);
    this.app.set('view engine', 'html');
    this.app.use(express.static('views'));
    this.routes()

    this.app.listen(process.env.PORT || 8080)
  }
}

new Server()
