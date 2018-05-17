import express from 'express'

export default class Index {
  public index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('index')
  }
  constructor() {

  }
}