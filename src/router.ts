import db from './db'
import request from 'request'
import express from 'express'

const router: express.Router = express.Router()
router.get('/aboutme', (req, res, next) => {
  res.send('aboutme.html')
})

router.get('/get_article_by_id', (req, res, next) => {
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
})

router.get('/get_article_list', (req, res, next) => {
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
})

router.get('/get_git_articles', (req, res, next) => {
  let text = ''
  request.get({
    url: "https://api.github.com/repos/Ganother/blog/issues",
    encoding: 'utf8',
    headers: { 'User-Agent': 'request' }
  }, (error, response, body) => {
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
})
export default router 