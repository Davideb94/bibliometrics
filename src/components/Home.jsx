import React from 'react';

export default class App extends React.Component {

    render() {
        return (
            <div id={ "home" }>
                <div className={ "panel" }></div>

                <div className={ "container" }>
                    <aside>
                        <p>here is sidenav</p>
                    </aside>
                    <main>
                        <p>here is main</p>
                    </main>
                </div>
            </div>
        );
    }

}