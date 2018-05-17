import * as React from "react";

const navHtml =
  <header className="header">
    <div className="logo-bar">
      <img src="./images/logo.png" alt="希尔瓦娜斯克拉博" className="logo" id="logo"/>
      <h1 className="name">希尔瓦娜斯的克拉博</h1>
    </div>
    <nav className="header-nav">
      <ul className="nav-bar">
        <li className="item"><a href="" className="link">HOME</a></li>
        <li className="item"><a href="" className="link">FRONT-END</a></li>
        <li className="item"><a href="" className="link">DEAL-LIFE</a></li>
        <li className="item"><a href="" className="link">ABOUT THIS MAN</a></li>
      </ul>
    </nav>
  </header>
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Nav extends React.Component {
  render() {
    return navHtml
  }
}