import React from 'react';

import Panel from './Panel.jsx';
import tilesFactory from '../tilesFactory.jsx';
import SearchPanel from './SearchPanel.jsx';
import Loader from "./Loader.jsx";

import consts from '../consts.js';
import dictionary from '../dictionary.js';
import newModel from '../newModel.js';
import isEmpty from '../utils/utils.js';
import logger from '../utils/logger.js';


export default class Home extends React.Component {

    /***************************

         C O N S T R U C T O R

     ****************************/
    constructor( props ){
        super( props );

        this.EVENT_ON_CLOSE_PANEL = new Event( consts.EVENT_ON_CLOSE_PANEL );

        this.panel = React.createRef();
        this.input = React.createRef();
        this.tilesFactory = new tilesFactory( this._onOpenPanel, this );
        this.newModel = new newModel();

        this.state = {

            //-- UI INFO --//
            active_tab: 0,
            openPanel: false,
            show_co_authors: false,
            openSearch: false,

            //-- MODEL DATA --//
            selected_auth: null,
            keyword: null,
            authors: this.newModel._authors,
            publications: this.newModel._publications,
            contentIsLoaded: false,

        };

        window.addEventListener( consts.EVENT_AUTHORS_DID_CHANGE, () => {
            this.updateAuthors( this.newModel._authors );
        } );

        window.addEventListener( consts.EVENT_PUBLICATIONS_DID_CHANGE, () => {
           this.updatePublications( this.newModel._publications );
        } );

    }

    /***************************

     L I F E C Y C L E      M E T H O D S

     ****************************/

    componentDidMount(){

        let authors_holder = document.getElementById( 'authors_holder' );
        let publications_holder = document.getElementById( 'publications_holder' );

        let authors_list = document.getElementById( 'authors_list' );
        let publications_list = document.getElementById( 'publications_list' );

        authors_holder.addEventListener( consts.EVENT_SCROLL, function() {

            if( authors_holder.offsetHeight + authors_holder.scrollTop - 95 - 15  >= authors_list.offsetHeight ){
                window.dispatchEvent( new Event(consts.EVENT_LOAD_AUTHORS) );
            }

        });

        publications_holder.addEventListener( consts.EVENT_SCROLL, function() {

            if ( publications_holder.offsetHeight + publications_holder.scrollTop - 95 - 15 >= publications_list.offsetHeight ) {
                window.dispatchEvent( new Event(consts.EVENT_LOAD_PUBLICATIONS) );
            }
        });



    }

    /***************************

       M E T H O D S

     ****************************/

    updateAuthors( authors ){

        this.setState({
            authors: authors,
            contentIsLoaded: true
        });

    }

    updatePublications( pubs ){

        this.setState({
            publications: pubs,
            contentIsLoaded: true
        });

    }

    updateSearch(){
        this.newModel.getAuthors( this.state.keyword );
        this.newModel.getPublications( this.state.keyword );
    }

    updateKeyword( keyword ){

        this.setState({
            keyword: keyword
        });

    }

    _onTabClick( tab ){

        if( tab ){
            this.setState({
                active_tab: 1
            });
        } else if( !tab ){
            this.setState({
                active_tab: 0
            });
        } else{
            console.warn( "Home._onTabClick: error in tab parameter" );
        }

    }

    _updateShowCoAuthors(){

        this.setState({
            show_co_authors: !this.state.show_co_authors
        });

    }

    _onShowCoAuthors(){
        this.panel.current._onShowCoAuthors();
    }

    _onOpenSearch(){

        this.input.current.giveFocus();

        this.setState({
            openSearch: !this.state.openSearch
        });

    }

    _onOpenPanel( id ){

        this.setState({
            openPanel: true,
            selected_auth: id,
            show_co_authors: false
        });

        if( this.state.show_co_authors ){
            this.panel.current._onShowCoAuthors();
        }
        this.panel.current._updatePanelData( id );

    }

    _onClosePanel(){

        this.setState({
            openPanel: false,
            selected_auth: null
        });

        if( this.state.show_co_authors ){
            this.panel.current._onShowCoAuthors();
        }

        window.dispatchEvent( this.EVENT_ON_CLOSE_PANEL );

    }

    _renderTiles( data ){

        let list = [];

        for( let item in data.items ){
            list.push( this.tilesFactory.build( data.type, item, data.items[item] ) );
        }

        return list;

    }

    /***************************

        R E N D E R    M E T H O D

     ****************************/

    render() {

        if( this.state.selected_auth ){

            this.newModel.getAuthorName( this.state.selected_auth );
            this.newModel.getNumberOfPublications( this.state.selected_auth );
            this.newModel.getAuthorUniversity( this.state.selected_auth );
            this.newModel.getCurrentPublications( this.state.selected_auth );

        }

        return (
            <section id={ "home" } className={ "container" }>
                <div className={ "container main_container" }>
                    <aside>
                        <div onClick={ this._onOpenSearch.bind(this) } className={this.state.openPanel ? 'search hide' : 'search'}>
                            <img src={ consts.IMG_SEARCH } />
                            <p>{ this.state.keyword ? this.state.keyword : dictionary.search }</p>
                        </div>
                        <div onClick={ this._onShowCoAuthors.bind(this) } className={this.state.openPanel ? 'open_auth' : 'open_auth hide'}>
                            <p> {this.state.show_co_authors ? dictionary.hide_co_authors :  dictionary.show_co_authors} </p>
                            <img src={ consts.IMG_DOWN_ARROW } />
                        </div>
                    </aside>

                    <section className={this.state.openPanel ? 'closing_layer' : 'closing_layer hide'} onClick={ this._onClosePanel.bind(this) }></section>

                    <Panel ref={this.panel} className={ this.state.openPanel ? 'swipe_in_right': null } update_show_co_authors={this._updateShowCoAuthors.bind(this)} openPanel={ this._onOpenPanel.bind(this) } homeSelf={ this } model={ this.newModel }/>

                    <SearchPanel ref={this.input} className={ this.state.openSearch ? 'layer_fade_in search_panel' : 'search_panel' } updateKeyword={ this.updateKeyword.bind(this) } openSearch={ this._onOpenSearch.bind(this) } isOpened={ this.state.openSearch } updateSearch={ this.updateSearch.bind(this) }/>

                    <main id={ 'main' }>
                        <header>
                            <div className={ this.state.active_tab ? "tab_btn" : "tab_btn active" } onClick={ () => {this._onTabClick( 0 )} }>
                                <p> {dictionary.authors} </p>
                            </div>
                            <div className={ this.state.active_tab ? "tab_btn active" : "tab_btn" } onClick={ () => {this._onTabClick( 1 )} }>
                                <p> {dictionary.tab_publications} </p>
                            </div>
                        </header>
                        <Loader show={ this.state.contentIsLoaded ? false : true } />
                        <div id={ 'authors_holder' } className={ this.state.active_tab ? "list_holder hide" : "list_holder" }>
                            <ul id={ 'authors_list' } className={ 'list_wrapper' }>
                                { this._renderTiles(this.state.authors) }
                                { logger( 'Home, render', 'this._renderTiles(this.state.authors', this._renderTiles(this.state.authors)) }
                            </ul>
                        </div>
                        <div id={ 'publications_holder' } className={ this.state.active_tab ? "list_holder" : "list_holder hide" }>
                            <ul id={ 'publications_list' } className={ 'list_wrapper' }>
                                { this._renderTiles(this.state.publications) }
                            </ul>
                        </div>
                    </main>
                </div>
            </section>
        );
    }

}