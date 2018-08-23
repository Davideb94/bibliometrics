import React from 'react';
import * as firebase from 'firebase';

import consts from "./consts";


export default class newModel extends React.Component {

    constructor( props ) {
        super(props);

        this.EVENT_AUTHORS_CHANGE = new Event( consts.EVENT_AUTHORS_DID_CHANGE );
        this.EVENT_PUBLICATIONS_CHANGE = new Event( consts.EVENT_PUBLICATIONS_DID_CHANGE );

        this.loaded_authors = 10;
        this.loaded_publications = 10;

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

        //-- _connect to firebase --//
        this._connect();

        //-- fills fields with fetched data --//
        this._getAuthors();
        this._getPublications();

        //-- sets listeners --//
        window.addEventListener( consts.EVENT_LOAD_AUTHORS, () => {
            console.log( '[newModel] init: LOAD MORE AUTHORS!!!!!' );
            this._increaseLoadedAuthors();
        } );

        window.addEventListener( consts.EVENT_LOAD_PUBLICATIONS, () => {
            console.log( '[newModel] init: LOAD MORE PUBS!!!!!!!' );
            this._increaseLoadedPublications();
        } );

    }

    _connect(){
        firebase.initializeApp( consts.FIREBASE_CONNECTION );
    }

    _getAuthors(){

        let authors = firebase.database().ref().child( consts.TABLE_PERSONS ).limitToFirst( this.loaded_authors );
        authors.on( 'value', snap => {
            this._authors.items = snap.val();
            window.dispatchEvent( this.EVENT_AUTHORS_CHANGE );
        } );

    }

    _getPublications(){

        let publications = firebase.database().ref().child( consts.TABLE_BIB ).limitToFirst( this.loaded_publications );
        publications.on( 'value', snap => {
            this._publications.items = snap.val();
            window.dispatchEvent( this.EVENT_PUBLICATIONS_CHANGE );
        } );

    }

    _increaseLoadedAuthors(){

        this.loaded_authors = this.loaded_authors + 10;
        this._getAuthors();
        window.dispatchEvent( new Event(consts.EVENT_AUTHORS_DID_CHANGE) );

    }

    _increaseLoadedPublications(){
        this.loaded_publications = this.loaded_publications + 10;
        this._getPublications();
        window.dispatchEvent( new Event(consts.EVENT_PUBLICATIONS_DID_CHANGE) );
    }


}