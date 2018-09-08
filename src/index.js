import React from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';
import dictionary from './dictionary';
import consts from './consts';


import Home from './components/Home';

import registerServiceWorker from './registerServiceWorker';

class index extends React.Component {

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

}

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
