import mongoose from 'mongoose'
import assert from 'assert'

const url: string = 'mongodb://root:root@localhost:27017/blog'

interface article {
  title: String,
  author: String,
  gitUrl: String,
  status: Number,
  imgUrl: String,
  headUrl: String,
  articleId: Number,
  body: String,
  updated_at: String
}
const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  gitUrl: String,
  status: Number,
  imgUrl: String,
  headUrl: String,
  articleId: Number,
  body: String,
  updated_at: String
})
const model = mongoose.model('Article', articleSchema)


class DB {
  private db
  private model
  constructor() {
    mongoose.connect(url, { useNewUrlParser: true })
  }
  public insertArticle(article: article) {
    const _article = new model(article)
    return new Promise((resolve, reject) => {
      _article.save().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  public find(data: any) {
    return new Promise((resolve, reject) => {
      model.find(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  public update(query: any, commit: any) {
    return new Promise((resolve, reject) => {
      model.updateOne(query, commit).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  public remove(col: string, query: any, callback) {
    const collection = this.db.collection(col)
    collection.deleteOne(query, (err, result) => {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      callback(result)
    })
  }
}

export default new DB()