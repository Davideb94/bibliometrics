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

        this.EVENT_AUTHORS_CHANGE = new Event( consts.EVENT_AUTHORS_CHANGE );
        this.EVENT_PUBLICATIONS_CHANGE = new Event( consts.EVENT_PUBLICATIONS_CHANGE );

        this._authors = {
            type: consts.TILE_TYPE_AUTHORS,
            items: {}
        };

        this._publications = {
            type: consts.TILE_TYPE_PUBLICATIONS,
            items: {}
        };

        this.init();
    }

    init(){

        //-- connect to firebase --//
        this.connect();

        //-- fills fields with fetched data --//
        let authors = firebase.database().ref().child( consts.TABLE_PERSONS ).limitToFirst( this.state.loaded_authors );
        authors.on( 'value', snap => {
            this._authors.items = snap.val();
            window.dispatchEvent( this.EVENT_AUTHORS_CHANGE );
        } );

        let publications = firebase.database().ref().child( consts.TABLE_BIB ).limitToFirst( this.state.loaded_publications );
        publications.on( 'value', snap => {
            this._publications.items = snap.val();
            window.dispatchEvent( this.EVENT_PUBLICATIONS_CHANGE );
        } );

    }

    connect(){
        firebase.initializeApp( consts.FIREBASE_CONNECTION );
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