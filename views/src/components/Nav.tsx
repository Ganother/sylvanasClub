import * as React from "react";
import { Link } from 'react-router-dom'
import { changeGlobal } from "../models/data";
const navHtml =
  <header className="header">
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
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Nav extends React.Component {
  constructor(props){
    super(props)
    setTimeout(() => {
      changeGlobal('headerAnimationDone', true)
    }, 2500);
  }
  render() {
    return navHtml
  }
}