import React from 'react';
import Panel from './Panel.jsx';
import Tile from './Tile.jsx';
import dictionary from '../dictionary.js';


export default class Home extends React.Component {

    constructor( props ){
        super( props );

        this.panel = React.createRef();

        this.state = {
            active_tab: 0,
            openPanel: false,
            show_co_authors: false,

            selected_auth: null
        }
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

    }

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
                        <ul className={ this.state.active_tab ? "list_wrapper hide" : "list_wrapper" }>
                            <Tile id={1} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={2} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={3} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={4} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={5} openPanel={ this._onOpenPanel.bind(this) } />
                        </ul>
                        <ul className={ this.state.active_tab ? "list_wrapper" : "list_wrapper hide" }>
                            <Tile id={1} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={2} openPanel={ this._onOpenPanel.bind(this) } />
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}