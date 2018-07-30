import db from './db'
import request from 'request'
import express from 'express'
import fs from 'fs'
import formidable from 'formidable'

const router: express.Router = express.Router()
router.get('/aboutme', (req, res, next) => {
  res.send('aboutme.html')
})

const TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/images/',
    domain = "http://localhost:8080";

router.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'views' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  // res.send('233333');
  form.parse(req, function(err, fields, files) {

    if (err) {
      res.send(err)
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    let fileName = files.img.path.replace('views', '')
    db.update({ "articleId": fields.id }, {imgUrl: fileName}).then(result => {
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

    // var extName = '';  //后缀名
    // switch (files.fulAvatar.type) {
    //   case 'image/pjpeg':
    //     extName = 'jpg';
    //     break;
    //   case 'image/jpeg':
    //     extName = 'jpg';
    //     break;
    //   case 'image/png':
    //     extName = 'png';
    //     break;
    //   case 'image/x-png':
    //     extName = 'png';
    //     break;
    // }

    // if(extName.length == 0){
    //   res.locals.error = '只支持png和jpg格式图片';
    //   res.render('index', { title: TITLE });
    //   return;
    // }

    // var avatarName = Math.random() + '.' + 'png';
    // //图片写入地址；
    // var newPath = form.uploadDir + avatarName;
    // //显示地址；
    // var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    // console.log("newPath",newPath);
    // fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    // res.json(files);
  });
});

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
  let text:string = ''
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