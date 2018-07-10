import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, browserHistory } from 'react-router-dom';

import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';

class App extends React.Component {
    render() {
        return(
            <Router history={ browserHistory }>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));