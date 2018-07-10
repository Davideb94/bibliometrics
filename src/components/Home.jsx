import React from 'react';

export default class App extends React.Component {

    render() {
        return (
            <div id={ "home" }>
                <div className={ "panel" }></div>

                <div className={ "container" }>
                    <aside></aside>
                    <main></main>
                </div>
            </div>
        );
    }

}