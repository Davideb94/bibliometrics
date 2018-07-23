import React from 'react';

export default class Panel extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            showCoAuthors: false
        }

    }

    _onShowCoAuthors(){

        this.setState({
            showCoAuthors: !this.state.showCoAuthors
        });
        this.props.update_show_co_authors();

    }

    render() {

        console.log( 'Panel.render, selected_auth: ' );
        console.log( this.props.selected_auth );

        return (
            <section id={ 'panel' } className={ this.props.className }>
                <div className={ this.state.showCoAuthors ? 'co_authors_layer open' : 'co_authors_layer' }></div>
            </section>
        );
    }

}