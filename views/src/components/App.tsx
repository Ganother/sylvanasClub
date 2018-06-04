import { Nav } from './Nav'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './Home'
import { FrontEnd } from './FrontEnd'
import { Life } from './Life'
import { About } from './About'
export class App extends React.Component {
  render() {
    return (
      <>
        <Nav></Nav>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/blog" render={() => <FrontEnd />} />
            <Route path="/magic" render={() => <Life />} />
            <Route path="/evil" render={() => <About />} />
          </Switch>
        </div>
      </>
    )
  }
}