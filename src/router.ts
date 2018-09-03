import db from './db'
import request from 'request'
import express from 'express'
import upload from './routes/upload'
import { getArticleById, getArticleList, getGitArticles } from './routes/article';

const router: express.Router = express.Router()
router.get('/aboutme', (req, res, next) => {
  res.send('aboutme.html')
})

router.post('/upload', upload);

router.get('/get_article_by_id', getArticleById)

router.get('/get_article_list', getArticleList)

router.get('/get_git_articles', getGitArticles)
export default router 