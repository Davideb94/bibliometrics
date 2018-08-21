import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import * as firebase from 'firebase';

import consts from './consts.js';
import dictionary from './dictionary.js';

import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';


var config = {
    apiKey: "AIzaSyD_GYwuLH1L6gijmIzTXKTQ7y8r5CI3_4o",
    authDomain: "bibliometrics-d9806.firebaseapp.com",
    databaseURL: "https://bibliometrics-d9806.firebaseio.com",
    projectId: "bibliometrics-d9806",
    storageBucket: "bibliometrics-d9806.appspot.com",
    messagingSenderId: "732085926993"
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