import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter} from 'react-router-dom'
import { App } from './components/App'

const RouterConfig = (<HashRouter>
    <App />
</HashRouter>)

ReactDOM.render(
    RouterConfig,
    document.getElementById("app")
);