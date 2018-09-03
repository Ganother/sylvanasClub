import * as React from "react";
import { Link } from 'react-router-dom'
import { changeGlobal } from "../models/data";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Nav extends React.Component {
  public state:any
  constructor(props){
    super(props)
    this.state = {headerClass: 'header'}
    const loadingDom =  document.getElementById('loading')
    const self = this
    var headerImage = new Image()
    headerImage.onload = function () {
        setTimeout(function(){
           loadingDom && (loadingDom.style.display = 'none');
           self.setState({headerClass: 'header header-animation'})
        }, 1000)
    }
    headerImage.src = '/images/header_back.jpg'
    setTimeout(() => {
      changeGlobal('headerAnimationDone', true)
    }, 2500);
  }
  render() {
    return <header className={this.state.headerClass}>
    <div className="logo-bar">
      <img src="./images/logo.png" alt="希尔瓦娜斯克拉博" className="logo" id="logo" />
      <h1 className="name">希尔瓦娜斯的克拉博</h1>
    </div>
    <nav className="header-nav">
      <ul className="nav-bar">
        <li className="item"><Link to="/" className="link">HOME</Link></li>
        <li className="item"><Link to="/blog" className="link">FRONT-END</Link></li>
        <li className="item"><Link to="/magic" className="link">DEAL-LIFE</Link></li>
        <li className="item"><a href="/aboutme.html" className="link">ABOUT THIS MAN</a></li>
      </ul>
    </nav>
    <div className="overlay"></div>
  </header>
  }
}