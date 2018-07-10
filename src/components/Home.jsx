import React from 'react';
import Panel from './Panel.jsx';


export default class App extends React.Component {

    render() {
        return (
            <section id={ "home" } className={ "container" }>
                <div className={ "container" }>
                    <aside>
                    </aside>

                    <Panel/>

                    <main>
                    </main>
                </div>
            </section>
        );
    }

}