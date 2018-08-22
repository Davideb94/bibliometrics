import React from 'react';

import Panel from './Panel.jsx';
import tilesFactory from '../tilesFactory.jsx';
import SearchPanel from './SearchPanel.jsx';

import consts from '../consts.js';
import dictionary from '../dictionary.js';
import newModel from '../newModel.js';


export default class Home extends React.Component {

    /***************************

         C O N S T R U C T O R

     ****************************/
    constructor( props ){
        super( props );

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

        };

        window.addEventListener( consts.EVENT_AUTHORS_CHANGE, () => {
            this.updateAuthors( this.newModel._authors );
        } );

        window.addEventListener( consts.EVENT_PUBLICATIONS_CHANGE, () => {
           this.updatePublications( this.newModel._publications );
        } );

    }

    /***************************

     L I F E C Y C L E      M E T H O D S

     ****************************/



    /***************************

       M E T H O D S

     ****************************/

    updateAuthors( authors ){

            this.setState({
                authors: authors
            });

            window.setTimeout( () =>{
                console.log( '[Home] updateAuthors: ' );
                console.log( this.state.authors );
            }, 1000 );
    }

    updatePublications( pubs ){

        this.setState({
            publications: pubs
        });

        window.setTimeout( () =>{
            console.log( '[Home] updatePublications: ' );
            console.log( this.state.publications );
        }, 1000 );
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

    }

    _renderTiles( data ){

        let list = [];

        for( let item in data.items ){
            list.push( this.tilesFactory.build( data.type, item, data.items[item] ) );
        }

        console.log( '[Home] _renderTiles:' );
        console.log( list );

        return list;

    }

    /***************************

        R E N D E R    M E T H O D

     ****************************/

    render() {

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

                    <Panel ref={this.panel} className={ this.state.openPanel ? 'swipe_in_right': null } selected_auth={ this.state.selected_auth } update_show_co_authors={this._updateShowCoAuthors.bind(this)} openPanel={ this._onOpenPanel.bind(this) } homeSelf={ this } />

                    <SearchPanel ref={this.input} className={ this.state.openSearch ? 'layer_fade_in search_panel' : 'search_panel' } updateKeyword={ this.updateKeyword.bind(this) } />

                    <main>
                        <header>
                            <div className={ this.state.active_tab ? "tab_btn" : "tab_btn active" } onClick={ () => {this._onTabClick( 0 )} }>
                                <p> {dictionary.authors} </p>
                            </div>
                            <div className={ this.state.active_tab ? "tab_btn active" : "tab_btn" } onClick={ () => {this._onTabClick( 1 )} }>
                                <p> {dictionary.tab_publications} </p>
                            </div>
                        </header>
                        <ul id={ 'authors_list' } className={ this.state.active_tab ? "list_wrapper hide" : "list_wrapper" }>
                            { this._renderTiles(this.state.authors) }
                        </ul>
                        <ul id={ 'publications_list' } className={ this.state.active_tab ? "list_wrapper" : "list_wrapper hide" }>
                            { this._renderTiles(this.state.publications) }
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}