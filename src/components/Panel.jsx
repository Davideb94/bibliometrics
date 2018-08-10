import React from 'react';
import PropTypes from 'prop-types';

import dictionary from '../dictionary.js';
import model from '../model.js';

export default class Panel extends React.Component {

    constructor( props ){
        super( props );

        this.state = {

            //-- UI INFO --//
            showCoAuthors: false,

        };

        this.model = model;

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
        console.log( '[panel] author_name: ' + this.props.name );
        console.log( '[panel] author_university: ' + this.props.university );

        return (

            <section id={ 'panel' } className={ this.props.className }>
                <div className={ this.state.showCoAuthors ? 'co_authors_layer open' : 'co_authors_layer' }></div>

                <div className={ 'header' }>
                    <div className={ 'holder left' }>
                        <p id={ 'name' } className={ 'name' }>{ this.props.name }</p>
                        <p id={ 'university' } className={ 'university' }>{ this.props.university }</p>
                    </div>
                    <div className={ 'holder right' }>
                        <p className={ 'number_of_publications' }>45</p>
                        <p className={ 'publications' }>
                            {dictionary.publications}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

}

Panel.propTypes = {

    selected_auth: PropTypes.number,
    update_show_co_authors: PropTypes.func

}