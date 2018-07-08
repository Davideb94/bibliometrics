import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, browserHistory } from 'react-router-dom';

import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';

class App extends React.Component {
    render() {
        return(
            <Router history={ browserHistory }>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/will-not-match">Will Not Match</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));