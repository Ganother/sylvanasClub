import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Article } from './interface'
export class Home extends React.Component {
  public state: any
  constructor(props) {
    super(props)
    this.state = { list: [] }
    let self = this
    axios.get('/get_article_list').then(res => {
      console.log(res.data)
      self.setState({ list: res.data.data })
    })
  }
  componentDidMount() {
  }
  render() {
    return (
      <>
        <ul className="home-list">
          {
            this.state.list.map((item: Article) => {
              return (
                <li className="item">
                  <Link to="/" className="link">
                    <div className="img-box">
                      <img src="//c1.staticflickr.com/5/4644/39335266522_cda56bc32d_k.jpg" alt="" className="img" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p className="time">{new Date(item.updated_at).toLocaleString('en-ZA')}</p>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </>
    )
  }
}