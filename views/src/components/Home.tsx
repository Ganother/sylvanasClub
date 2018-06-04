import React from 'react'
import { Link } from 'react-router-dom'
const List: JSX.Element =
  <ul className="home-list">
    <li className="item">
      <Link to="/" className="link">
        <div className="img-box">
          <img src="//c1.staticflickr.com/5/4644/39335266522_cda56bc32d_k.jpg" alt="" className="img" />
        </div>
        <p className="title">哇啦啦啦有鬼哦</p>
        <p className="time">2018-09-08</p>
        <p className="desc">这里是描述打客服建档立卡几分开了多久啊六块腹肌大了看风景的脸孔解放东路看附近开了大附近开了大看风景的撒开发及东京暗法律课教案立刻发的卡积分离开多久啊开了房间打开啦荆防颗粒打几分离开大家看法经典款啦飞机离开</p>
      </Link>
    </li>
  </ul>
export class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return List
  }
}