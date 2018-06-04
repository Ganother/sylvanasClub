import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter} from 'react-router-dom'
import { Nav } from "./components/Nav"
import { App } from './components/App'
import { Home } from './components/Home'
import { FrontEnd } from './components/FrontEnd'

const RouterConfig = (<HashRouter>
    <App />
</HashRouter>)

ReactDOM.render(
    RouterConfig,
    document.getElementById("app")
);