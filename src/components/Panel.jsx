import React from 'react';
import PropTypes from 'prop-types';

import dictionary from '../dictionary.js';
import model from '../model.js';

import tilesFactory from '../tilesFactory.jsx';

export default class Panel extends React.Component {

    constructor( props ){
        super( props );

        this.state = {

            //-- UI INFO --//
            showCoAuthors: false,

            //-- MODEL --//
            name: null,
            university: null

        };

        this.model = model;
        this.tilesFactory = new tilesFactory( null, null );

    }

    _getCurrentAuthorName( id ){

        let name = undefined;

        this.model._authors.items.forEach( (item) => {
            if( item.id == id ){
                name = item.name;
            }
        } );

        return name;

    };

    _getCurrentAuthorUniversity( id ){

        let university = undefined;

        this.model._authors.items.forEach( (item) => {
            if( item.id == id ){
                university = item.university;
            }
        } );

        return university;

    };

    _updatePanelData( id ){

        this.setState({
            name: this._getCurrentAuthorName( id ),
            university: this._getCurrentAuthorUniversity( id )
        });

    }

    _onShowCoAuthors(){

        this.setState({
            showCoAuthors: !this.state.showCoAuthors
        });
        this.props.update_show_co_authors();

    }

    _renderTiles( data ){

        console.log( '[Panel] _renderTiles: ' + data );
        let list = data.items.map(
            ( item ) => this.tilesFactory.build( data.type, item )
        );
        return list;

    }

    render() {

        return (

            <section id={ 'panel' } className={ this.props.className }>
                <div className={ this.state.showCoAuthors ? 'co_authors_layer open' : 'co_authors_layer' }></div>

                <div className={ 'header' }>
                    <div className={ 'holder left' }>
                        <p id={ 'name' } className={ 'name' }>{ this.state.name }</p>
                        <p id={ 'university' } className={ 'university' }>{ this.state.university }</p>
                    </div>
                    <div className={ 'holder right' }>
                        <p className={ 'number_of_publications' }>45</p>
                        <p className={ 'publications' }>
                            {dictionary.publications}
                        </p>
                    </div>
                </div>
                <div className={ 'body' }>
                    <ul>
                        { this._renderTiles(this.model._publications) }
                    </ul>
                </div>
            </section>
        );
    }

}

Panel.propTypes = {

    selected_auth: PropTypes.number,
    update_show_co_authors: PropTypes.func

}