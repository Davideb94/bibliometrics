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

        //here we'll set items in both _authors and _publications fields to the corresponding data fetched from firebase
        this.connect();

        let authors = firebase.database().ref().child( consts.TABLE_PERSONS ).limitToFirst( this.state.loaded_authors );
        authors.on( 'value', snap => {
            this._authors.items = snap.val()
        } );

        let publications = firebase.database().ref().child( consts.TABLE_BIB ).limitToFirst( this.state.loaded_publications );
        publications.on( 'value', snap => {
            this._publications.items = snap.val()
        } );

        window.setTimeout( () => {
            console.log( '[newModel]: init' );
            console.log( this._authors.items );
            console.log( this._publications.items );
        }, 1000 );



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