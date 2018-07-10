import React from 'react';
import Panel from './Panel.jsx';
import Tile from './Tile.jsx';


export default class Home extends React.Component {

    render() {
        return (
            <section id={ "home" } className={ "container" }>
                <div className={ "container main_container" }>
                    <aside>
                    </aside>

                    <Panel/>

                    <main>
                        <ul className={ "list_wrapper" }>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                            <Tile/>
                        </ul>
                    </main>
                </div>
            </section>
        );
    }

}