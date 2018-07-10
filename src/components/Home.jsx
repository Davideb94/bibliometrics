import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel.jsx';
import Tile from './Tile.jsx';


export default class Home extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            openPanel: false
        }
    }


    onCallPanel(){

        this.setState({
            openPanel: !this.state.openPanel
        });

    }

    render() {
        return (
            <section id={ "home" } className={ "container" }>
                <div className={ "container main_container" }>
                    <aside>
                    </aside>

                    <Panel className={ this.state.openPanel ? 'swipe_in_right': null }  />

                    <main>
                        <ul className={ "list_wrapper" }>
                            <Tile callPanel={ this.onCallPanel.bind(this) } />
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}