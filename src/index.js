import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, browserHistory } from 'react-router-dom';
import consts from './consts.js';
import dictionary from './dictionary.js';

import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';



class App extends React.Component {

    componentDidMount(){
        this._setLanguageToEnglish();
    }

    _setLanguageToEnglish(){
        dictionary.setLanguage( consts.en );
        this.setState({});
    }

    _setLanguageToItalian(){
        dictionary.setLanguage( consts.it );
        this.setState({});
    }

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