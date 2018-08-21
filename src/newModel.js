import React from 'react';
import * as firebase from 'firebase';

import consts from "./consts";


export default class newModel extends React.Component {

    constructor( props ) {
        super(props);

        this.state = {
            loaded_authors: 10,
            loaded_publications: 10
        };

        this._config = {
            apiKey: "AIzaSyDgahb5PHrWRtW1xTXDrOckHE-9taazFQU",
            authDomain: "bibliometrics-3fd89.firebaseapp.com",
            databaseURL: "https://bibliometrics-3fd89.firebaseio.com",
            projectId: "bibliometrics-3fd89",
            storageBucket: "bibliometrics-3fd89.appspot.com",
            messagingSenderId: "951744954569"
        };

        this._authors = {
                type: consts.TILE_TYPE_AUTHORS,
                items: []
        };

        this._publications = {
            type: consts.TILE_TYPE_PUBLICATIONS,
            items: []
        };

        this.init();
    }

    init(){

        //here we'll set items in both _authors and _publications fields to the corresponding data fetched from firebase

        //-- connect to firebase --//
        firebase.initializeApp( this._config );

        console.log( '[newModel]: init' );
        let name = firebase.database().ref().child( 'name' );
        name.on( 'value', snap => console.log(snap.val()) );

    }

    increaseLoadedAuthors(){

        this.setState({
            loaded_authors: this.state.loaded_authors + 10
        });

    }

    increaseLoadedPublications(){

        this.setState({
            loaded_publications: this.state.loaded_publications + 10
        });

    }


}