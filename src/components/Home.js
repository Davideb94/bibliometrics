import React from 'react';

import Panel from './Panel';
import tilesFactory from '../tilesFactory';
import SearchPanel from './SearchPanel';
import Loader from "./Loader";

import consts from '../consts';
import dictionary from '../dictionary';
import newModel from '../newModel';
import isEmpty from '../utils/utils';
import logger from '../utils/logger';


export default class Home extends React.Component {

    /***************************

         C O N S T R U C T O R

     ****************************/
    constructor( props ){
        super( props );

        this.EVENT_ON_CLOSE_PANEL = new Event( consts.EVENT_ON_CLOSE_PANEL );

        this.from = {};
        this.to = {};

        this.panel = React.createRef();
        this.input = React.createRef();
        this.newModel = new newModel();
        this.tilesFactory = new tilesFactory( this._onOpenPanel, this, this.newModel );

        this.state = {

            //-- UI INFO --//
            active_tab: 0,
            openPanel: false,
            show_co_authors: false,
            openSearch: false,
            from_value: null,
            to_value: null,
            filter_is_set: false,

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

        window.addEventListener( consts.EVENT_UPDATE_CO_AUTHORS, () => {
            this.updateCoAuthors();
        } );

    }

    /***************************

     L I F E C Y C L E      M E T H O D S

     ****************************/

    componentDidMount(){

        //-- get inputs from dom --//
        this.from = document.getElementById( 'from' );
        this.to = document.getElementById( 'to' );

        //-- checks when scroll reached bottom and triggers event --//
        let authors_holder = document.getElementById( 'authors_holder' );
        let publications_holder = document.getElementById( 'publications_holder' );

        let authors_list = document.getElementById( 'authors_list' );
        let publications_list = document.getElementById( 'publications_list' );

        authors_holder.addEventListener( consts.EVENT_SCROLL, () => {

            if( authors_holder.offsetHeight + authors_holder.scrollTop - 95 - 15  >= authors_list.offsetHeight ){
                this.newModel.increaseLoadedAuthors( this.state.keyword );
            }

        });

        publications_holder.addEventListener( consts.EVENT_SCROLL, () => {

            if ( publications_holder.offsetHeight + publications_holder.scrollTop - 95 - 15 >= publications_list.offsetHeight ) {
                this.newModel.increaseLoadedPublications( this.state.keyword, this.state.from_value, this.state.to_value );
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

        this.setState({
            authors: {},
            publications: {},
            contentIsLoaded: false
        }, () =>{
            this.newModel.getAuthors( this.state.keyword );
            //check if there are any filters
            if( this.state.from_value && this.state.from_value ){
                this.newModel.getFilteredPubs( this.state.from_value, this.state.from_value, this.state.keyword )
            } else{
                this.newModel.getPublications( this.state.keyword );
            }
        });

    }

    updateKeyword( keyword ){

        keyword = keyword.trim();

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

    updateCoAuthors(){
        this.panel.current._onShowCoAuthors();
    }

    getCoAuthors(){
        this.newModel.getCoAuthors( this.state.selected_auth );
    }

    onSearchClick(){

        if( this.state.openSearch ){
            this.setState({
                keyword: null
            });
            this.updateSearch();
        }
        this._onOpenSearch();

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

    updateFrom(){

        this.setState({
            from_value: this.from.value
        });

    }

    updateTo(){

        this.setState({
            to_value: this.to.value
        });

    }

    setFilterDates(){

        this.newModel.getFilteredPubs( this.state.from_value, this.state.to_value, this.state.keyword );
        this.setState({
            filter_is_set: true
        });

    }

    removeFilterDates(){

        this.newModel.getPublications( this.state.keyword );
        this.setState({
            filter_is_set: false
        });

    }

    _renderTiles( data ){

        let list = [];

        for( let item in data.items ){
            if( data.items[item] !== undefined ){
                list.push( this.tilesFactory.build( data.type, item, data.items[item] ) );
            }
        }

        return list;

    }

    /***************************

        R E N D E R    M E T H O D

     ****************************/

    render() {

        var style_hide_filter = {
            opacity: 0.5
        }

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
                        <div onClick={ this.onSearchClick.bind(this) } className={this.state.openPanel ? 'search hide' : 'search'}>
                            <img className={ this.state.openSearch ? 'show' : 'hide' } src={ consts.IMG_CLOSE_SEARCH } />
                            <img className={ this.state.openSearch ? 'hide' : 'show' } src={ consts.IMG_SEARCH } />
                            <p>{ this.state.keyword ? this.state.keyword : dictionary.search }</p>
                        </div>
                        <div onClick={ this.getCoAuthors.bind(this) } className={this.state.openPanel ? 'open_auth' : 'open_auth hide'}>
                            <p> {this.state.show_co_authors ? dictionary.hide_co_authors :  dictionary.show_co_authors} </p>
                            <img className={ this.state.show_co_authors ? 'rotate_90' : 'show' } src={ consts.IMG_DOWN_ARROW } />
                        </div>
                        <div className={ this.state.active_tab ? 'date_field' : 'date_field date_field_hidden' } style={ this.state.openSearch ? style_hide_filter : {} }>
                            <div className={ 'date_header' } >
                                <img src={ consts.IMG_FILTER } />
                                <p>{ dictionary.date_field }</p>
                            </div>
                            <div className={ 'date_body' }>
                                <div className={ 'from_holder' }>
                                    <div className={ 'from_header' }>
                                        <p>{ dictionary.from }</p>
                                    </div>
                                    <div className={ 'from_body' }>
                                        <input id={ 'from' } className={ 'from' } placeholder={ dictionary.from } onChange={ this.updateFrom.bind(this) } disabled={ this.state.filter_is_set || this.state.openSearch }/>
                                    </div>
                                </div>
                                <div className={ 'to_holder' }>
                                    <div className={ 'to_header' }>
                                        <p>{ dictionary.to }</p>
                                    </div>
                                    <div className={ 'to_body' }>
                                        <input id={ 'to' } className={ 'to' } placeholder={ dictionary.to } onChange={ this.updateTo.bind(this) } disabled={ this.state.filter_is_set || this.state.openSearch  }/>
                                    </div>
                                </div>
                            </div>
                            <div className={ this.state.from_value && this.state.to_value && !this.state.filter_is_set ? 'apply_filter spread' : 'apply_filter' } onClick={ this.setFilterDates.bind(this) }>
                                <p className={ this.state.from_value && this.state.to_value && !this.state.filter_is_set ? '' : 'hide' }>{ dictionary.apply_filter }</p>
                            </div>
                            <div className={ this.state.filter_is_set ? 'remove_filter' : 'remove_filter hide' } onClick={ this.removeFilterDates.bind(this) }>
                                <p className={ this.state.filter_is_set ? '' : 'hide' }>{ dictionary.remove_filter }</p>
                            </div>
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
                            </ul>
                            <div className={ this.state.authors.items == null && this.state.contentIsLoaded ? 'not_found_holder' : 'hide'} >
                                <div className={ 'text' }>
                                    <p className={ 'not_found_statement' }>{ dictionary.authors_not_found + this.state.keyword  + '"'}</p>
                                    <p className={ 'not_found_label' }>{ dictionary.not_found_label }</p>
                                </div>
                            </div>
                        </div>
                        <div id={ 'publications_holder' } className={ this.state.active_tab ? "list_holder" : "list_holder hide" }>
                            <ul id={ 'publications_list' } className={ 'list_wrapper' }>
                                { this._renderTiles(this.state.publications) }
                            </ul>
                            <div className={ this.state.publications.items == null && this.state.contentIsLoaded ? 'not_found_holder' : 'hide'} >
                                <div className={ 'text' }>
                                    <p className={ 'not_found_statement' }>{ dictionary.publications_not_found + this.state.keyword + '"' }</p>
                                    <p className={ 'not_found_label' }>{ dictionary.not_found_label }</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        );
    }

}
