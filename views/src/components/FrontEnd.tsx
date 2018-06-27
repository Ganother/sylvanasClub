import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from './interface'
import axios from 'axios'
import { Flow, FlowItem } from './Flow'
export class FrontEnd extends React.Component {
  public state: any
  constructor(props) {
    super(props)
    this.state = { list: [] }
    let self = this
    axios.get('/get_article_list').then(res => {
      self.setState({ list: res.data.data })
    })
  }
  render() {
    let list = this.state.list
    return (
      <div className="home-list">
        <Flow rows={4} >
          {
            list.map((item: Article, index: number) => {
              return (
                <FlowItem index={index}>
                  <Link to={`/detail/${item._id}`} className="link">
                    <div className="img-box">
                      <img src="//c1.staticflickr.com/5/4644/39335266522_cda56bc32d_k.jpg" alt="" className="img" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p className="time">{new Date(item.updated_at).toLocaleString('en-ZA')}</p>
                  </Link>
                </FlowItem>
              )
            })
          }
        </Flow>
      </div>
    )
  }
}