import db from '../db'
import request from 'request'
import express, { Request, Response } from 'express'

export function getArticleById(req: Request, res: Response): any {
  db.find({ "_id": req.query.id }).then(result => {
    res.json({
      errcode: 0,
      data: result[0]
    })
  }).catch(err => {
    res.json({
      errcode: -1,
      data: err
    })
  })
}

export function getGitArticles(req: Request, res: Response): any {
  let text: string = ''
  request.get({
    url: "https://api.github.com/repos/Ganother/blog/issues",
    encoding: 'utf8',
    headers: { 'User-Agent': 'request' },
  }, (error, response, body) => {
    if (req.query.sylvanas !== 'ganother') {
      res.send('你触犯了未知领域')
    }
    const list = JSON.parse(body)
    db.find({}).then(data => {
      for (const gitA of list) {
        let isHave = false
        text += '<br>' + gitA.id
        for (const localA of (<any[]>data)) {
          if (gitA.id == localA.articleId) {
            isHave = true
            if (gitA.updated_at != localA.updated_at) {
              text += 'updating'
              db.update({ id: gitA.id }, gitA).then((result) => {
                text += result
              }).catch(err => {
                res.send(JSON.stringify(err))
              })
            }
          }
        }
        if (!isHave) {
          text += 'inserting'
          db.insertArticle({
            title: gitA.title,
            author: "Ganother",
            gitUrl: gitA.url, //文章的git接口地址
            status: 1,
            imgUrl: '/images/article_' + gitA.id + '.jpg',
            articleId: gitA.id,
            headUrl: '/images/head.jpg',
            body: gitA.body,
            updated_at: gitA.updated_at
          }).then((result) => {
            text += result
          }).catch(err => {
            res.send(JSON.stringify(err))
          })
        }
      }
      res.send(text)
    }).catch(err => {
      res.send(JSON.stringify(err))
    })
  })
}

export function getArticleList(req: Request, res: Response):any {
  db.find({}).then(result => {
    for(let item of <any[]>result){
      item.body = null
    }
    res.json({
      errcode: 0,
      data: result
    })
  }).catch(err => {
    res.json({
      errcode: -1,
      data: err
    })
  })
}