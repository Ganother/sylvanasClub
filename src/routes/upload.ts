import formidable from 'formidable'
import db from '../db'
import { Response, Request } from '../../node_modules/@types/express';

const AVATAR_UPLOAD_FOLDER:string = '/images/'
const TITLE:string = '文章配图'
    
export default function (req: Request, res:Response):any {
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
  });
}