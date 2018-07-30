import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from './interface'
import axios from 'axios'
import { Flow, FlowItem } from './Flow'
import { globalData } from '../models/data';

export class FrontEnd extends React.Component {
  public state: any
  constructor(props) {
    super(props)
    this.state = { list: [] }
    let self = this
    let openTime = +new Date()
    axios.get('/get_article_list').then(res => {
      let nowTime = +new Date();
      let delayTime = 2500 - (nowTime - openTime);
      (delayTime <= 0) && (delayTime = 0);
      (globalData.headerAnimationDone) && (delayTime = 0);
      setTimeout(() => {
        self.setState({ list: res.data.data })
      }, delayTime);
    })
  }
  render() {
    let list = this.state.list
    return (
      <div className="home-list">
        <Flow rows={3} >
          {
            list.map((item: Article, index: number) => {
              return (
                <FlowItem index={index}>
                  <Link to={`/detail/${item._id}`} className="link">
                    <div className="img-box">
                      <img src={item.imgUrl} alt="" className="img" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p className="time">{new Date(item.updated_at).toLocaleString('en-ZA')}</p>
                  </Link>
                  <i className="left"></i>
                  <i className="right"></i>
                  <i className="bottom"></i>
                  <i className="top"></i>
                </FlowItem>
              )
            })
          }
        </Flow>
      </div>
    )
  }
}