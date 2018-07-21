import React from 'react';
import Panel from './Panel.jsx';
import Tile from './Tile.jsx';


export default class Home extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            openPanel: false,
            selected_tile: null
        }
    }


    _onOpenPanel( id ){

        this.setState({
            openPanel: true,
            selected_tile: id
        });

    }

    _onClosePanel(){

        this.setState({
            openPanel: false,
            selected_tile: null
        });

    }

    render() {
        return (
            <section id={ "home" } className={ "container" }>
                <div className={ "container main_container" }>
                    <aside>
                    </aside>

                    <section className={this.state.openPanel ? 'closing_layer' : 'closing_layer hide'} onClick={ this._onClosePanel.bind(this) }></section>

                    <Panel className={ this.state.openPanel ? 'swipe_in_right': null } selected_tile={ this.state.selected_tile }  />

                    <main>
                        <ul className={ "list_wrapper" }>
                            <Tile id={1} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={2} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={3} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={4} openPanel={ this._onOpenPanel.bind(this) } />
                            <Tile id={5} openPanel={ this._onOpenPanel.bind(this) } />
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}