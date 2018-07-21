import React from 'react';

export default class Panel extends React.Component {

    render() {
        return (
            <section id={ 'panel' } className={ this.props.className }>
                <p> {this.props.selected_tile} </p>
            </section>
        );
    }

}