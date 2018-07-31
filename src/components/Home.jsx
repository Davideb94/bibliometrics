import React from 'react';

import Panel from './Panel.jsx';
import tilesFactory from '../tilesFactory.jsx';

import dictionary from '../dictionary.js';
import model from '../model.js'


export default class Home extends React.Component {

    /***************************

         C O N S T R U C T O R

     ****************************/
    constructor( props ){
        super( props );

        this.panel = React.createRef();
        this.tilesFactory = new tilesFactory( this._onOpenPanel, this );
        this.model = model;


        this.state = {

            //-- UI INFO --//
            active_tab: 0,
            openPanel: false,
            show_co_authors: false,

            //-- MODEL DATA --//
            selected_auth: null
        }
    }

    /***************************

       M E T H O D S

     ****************************/

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

    _onOpenPanel( id ){

        this.setState({
            openPanel: true,
            selected_auth: id
        });

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

        let list = data.items.map(
            ( item ) => this.tilesFactory.build( data.type, item )
        );
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
                        <div className={this.state.openPanel ? 'open_auth' : 'open_auth hide'}>
                            <p onClick={ this._onShowCoAuthors.bind(this) }> {this.state.show_co_authors ? dictionary.hide_co_authors :  dictionary.show_co_authors} </p>
                        </div>
                    </aside>

                    <section className={this.state.openPanel ? 'closing_layer' : 'closing_layer hide'} onClick={ this._onClosePanel.bind(this) }></section>

                    <Panel ref={this.panel} className={ this.state.openPanel ? 'swipe_in_right': null } selected_auth={ this.state.selected_auth } update_show_co_authors={this._updateShowCoAuthors.bind(this)} />

                    <main>
                        <header>
                            <div className={ this.state.active_tab ? "tab_btn" : "tab_btn active" } onClick={ () => {this._onTabClick( 0 )} }>
                                <p> {dictionary.authors} </p>
                            </div>
                            <div className={ this.state.active_tab ? "tab_btn active" : "tab_btn" } onClick={ () => {this._onTabClick( 1 )} }>
                                <p> {dictionary.publications} </p>
                            </div>
                        </header>
                        <ul id={ 'authors_list' } className={ this.state.active_tab ? "list_wrapper hide" : "list_wrapper" }>
                            { this._renderTiles(this.model._authors) }
                        </ul>
                        <ul id={ 'publications_list' } className={ this.state.active_tab ? "list_wrapper" : "list_wrapper hide" }>
                            { this._renderTiles(this.model._publications) }
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}