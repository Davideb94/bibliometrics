import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import * as firebase from 'firebase';

import consts from './consts.js';
import dictionary from './dictionary.js';

import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';


var config = {
    apiKey: "AIzaSyA4_qPIO-z2jfWqE3IwecPqcUp8fS7Rko4",
    authDomain: "bibliometrics-bc3df.firebaseapp.com",
    databaseURL: "https://bibliometrics-bc3df.firebaseio.com",
    projectId: "bibliometrics-bc3df",
    storageBucket: "bibliometrics-bc3df.appspot.com",
    messagingSenderId: "673481199121"
};
firebase.initializeApp(config);

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