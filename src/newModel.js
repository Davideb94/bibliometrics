import React from 'react';
import * as firebase from 'firebase';

import consts from "./consts";
import logger from './utils/logger.js';


export default class newModel extends React.Component {

    constructor( props ) {
        super(props);

        this.EVENT_AUTHORS_CHANGE = new Event( consts.EVENT_AUTHORS_DID_CHANGE );
        this.EVENT_PUBLICATIONS_CHANGE = new Event( consts.EVENT_PUBLICATIONS_DID_CHANGE );
        this.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE = new Event( consts.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE );
        this.EVENT_UPDATE_AUTHOR_NAME = new Event( consts.EVENT_UPDATE_AUTHOR_NAME );
        this.EVENT_UPDATE_NUMBER_OF_PUBS = new Event( consts.EVENT_UPDATE_NUMBER_OF_PUBS );
        this.EVENT_UPDATE_AUTHOR_UNIVERSITY = new Event( consts.EVENT_UPDATE_AUTHOR_UNIVERSITY );

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

        this.current_publications = {
            type: consts.TILE_TYPE_PUBLICATIONS,
            items: []
        }

        this.current_author_name = null;
        this.current_author_surname = null;
        this.current_number_of_pubs = null;
        this.current_author_university = null;

        this.init();
    }

    init(){

        //-- _connect to firebase --//
        this._connect();

        //-- fills fields with fetched data --//
        this.getAuthors( null );
        this.getPublications( null );

        //-- sets listeners --//
        window.addEventListener( consts.EVENT_LOAD_AUTHORS, () => {
            this.increaseLoadedAuthors();
        } );

        window.addEventListener( consts.EVENT_LOAD_PUBLICATIONS, () => {
            this.increaseLoadedPublications();
        } );

    }

    _connect(){
        firebase.initializeApp( consts.FIREBASE_CONNECTION );
    }

    getAuthors( keyword ){

        if( keyword ){

            keyword = keyword.trim();

            let authors = firebase.database().ref().child( consts.TABLE_PERSONS ).orderByChild("surname").equalTo(keyword);
            authors.on( 'value', snap => {
                this._authors.items = snap.val();
                window.dispatchEvent( this.EVENT_AUTHORS_CHANGE );
            } );

        } else{

            let authors = firebase.database().ref().child( consts.TABLE_PERSONS ).limitToFirst( this.loaded_authors );
            authors.on( 'value', snap => {
                this._authors.items = snap.val();
                window.dispatchEvent( this.EVENT_AUTHORS_CHANGE );
            } );

        }

    }

    getPublications( keyword ){

        if( keyword ){

            let publications = firebase.database().ref().child( consts.TABLE_BIB ).orderByChild("title").equalTo( keyword );
            publications.on( 'value', snap => {
                this._publications.items = snap.val();
                window.dispatchEvent( this.EVENT_PUBLICATIONS_CHANGE );
            } );

        } else{

            let publications = firebase.database().ref().child( consts.TABLE_BIB ).limitToFirst( this.loaded_publications );
            publications.on( 'value', snap => {
                this._publications.items = snap.val();
                window.dispatchEvent( this.EVENT_PUBLICATIONS_CHANGE );
            } );

        }

    }

    getCurrentPublications( code ){

        let didUpdate = false;
        let projects = [];
        let current_pubs = [];

        let projectsRef = firebase.database().ref().child( consts.TABLE_PUBS ).child( 'authors' ).child( code ).child( 'projects' );
        projectsRef.on( 'value', snap => {

            projects = snap.val();

            // should wrap this block in a promise and wait for it to actually finish before dispatching the event
            for( let project in projects ){
                let current_pubsRef = firebase.database().ref().child( consts.TABLE_BIB ).child( projects[project] );
                current_pubsRef.on( 'value', snap => {
                    if( snap.val() ){
                        current_pubs.push( snap.val() );
                        this.current_publications.items = current_pubs;
                        didUpdate = true;
                        window.dispatchEvent( this.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE );
                    }
                });
            }

            if( !didUpdate ){

                this.current_publications.items = [];
                window.dispatchEvent( this.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE );

            }

        } );

    }

    getAuthorName( code ){

        let nameRef = firebase.database().ref().child( consts.TABLE_PERSONS ).child( code ).child( 'name' );
        nameRef.on( 'value', snap => {
            this.current_author_name = snap.val();
        } );

        let surnameRef = firebase.database().ref().child( consts.TABLE_PERSONS ).child( code ).child( 'surname' );
        surnameRef.on( 'value', snap => {
            this.current_author_surname = snap.val();
            window.dispatchEvent( this.EVENT_UPDATE_AUTHOR_NAME );
        } );

    }

    getNumberOfPublications( code ){

        let projects = [];

        let ref = firebase.database().ref().child( consts.TABLE_PUBS ).child( 'authors' ).child( code ).child( 'projects' );
        ref.on( 'value', snap => {

            projects = snap.val();

            if( projects ){
                this.current_number_of_pubs = projects.length;
            } else{
                this.current_number_of_pubs = null;
            }

            window.dispatchEvent( this.EVENT_UPDATE_NUMBER_OF_PUBS );

        } );

    }

    getAuthorUniversity( code ){

        this.current_author_university = null;
        window.dispatchEvent( this.EVENT_UPDATE_AUTHOR_UNIVERSITY );

    }

    increaseLoadedAuthors(){

        this.loaded_authors = this.loaded_authors + 10;
        this.getAuthors();
        window.dispatchEvent( new Event(consts.EVENT_AUTHORS_DID_CHANGE) );

    }

    increaseLoadedPublications(){
        this.loaded_publications = this.loaded_publications + 10;
        this.getPublications();
        window.dispatchEvent( new Event(consts.EVENT_PUBLICATIONS_DID_CHANGE) );
    }


}