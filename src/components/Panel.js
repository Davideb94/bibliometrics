import React from 'react';
import PropTypes from 'prop-types';

import dictionary from '../dictionary';
import tilesFactory from '../tilesFactory';
import logger from '../utils/logger';
import consts from '../consts';

import PanelTilesList from "./PanelTilesList";

export default class Panel extends React.Component {

    constructor( props ){
        super( props );

        this.state = {

            //-- UI INFO --//
            showCoAuthors: false,

            //-- MODEL --//
            author_name: null,
            author_surname: null,
            number_of_pubs: null,
            author_university: null,
            co_authors: {
                type: consts.TILE_TYPE_AUTHORS,
                items: {}
            }

        };

        this.switchAuthor = this.props.openPanel;
        this.home_self = this.props.homeSelf;
        this.model = this.props.model;
        this.tilesFactory = new tilesFactory( this.switchAuthor, this.home_self );


        //--listeners--//
        window.addEventListener( consts.EVENT_UPDATE_AUTHOR_NAME, ()=>{
            this.updateAuthorName( this.model )
        });

        window.addEventListener( consts.EVENT_UPDATE_NUMBER_OF_PUBS, () => {
            this.updateNumberOfPubs( this.model )
        } );

        window.addEventListener( consts.EVENT_UPDATE_AUTHOR_UNIVERSITY, () => {
            this.updateAuthorUniversity( this.model );
        } );

        window.addEventListener( consts.EVENT_ON_CLOSE_PANEL, () => {
            this.onClosePanel();
        } );

    }


    _updatePanelData( id ){



    }

    onClosePanel(){

        this.setState({
            author_name: null,
            author_surname: null,
            number_of_pubs: null,
            author_university: null,
        });

    }

    updateAuthorUniversity( model ){

        this.setState({
            author_university: model.current_author_university
        });

    }

    updateNumberOfPubs( model ){

        this.setState({
            number_of_pubs: model.current_number_of_pubs
        });

    }

    updateAuthorName( model ){

        this.setState({
            author_name: model.current_author_name,
            author_surname: model.current_author_surname
        });

    }

    _onShowCoAuthors(){

        this.setState({
            showCoAuthors: !this.state.showCoAuthors,
            co_authors: {
                type: consts.TILE_TYPE_AUTHORS,
                items: this.model.co_authors
            },
        });
        this.props.update_show_co_authors();

    }

    _renderTiles( data ){

        let list = [];

        for( let item in data.items ){
            if( data.items[item] !== undefined ){
                list.push( this.tilesFactory.build( data.type, item, data.items[item] ) );
            }
        }

        return list;

    }

    render() {

        return (

            <section id={ 'panel' } className={ this.props.className }>
                <div className={ this.state.showCoAuthors ? 'co_authors_layer open' : 'co_authors_layer' }>
                    <ul className={ this.state.showCoAuthors ? 'co_authors_list fade_in' : 'co_authors_list' }>
                        { this._renderTiles( this.state.co_authors ) }
                    </ul>
                </div>

                <div className={ 'header' }>
                    <div className={ 'holder left' }>
                        <p id={ 'name' } className={ 'name' }>{ this.state.author_name + ' ' + this.state.author_surname }</p>
                        <p id={ 'university' } className={ 'university' }>{ this.state.author_university ? this.state.author_university : dictionary.undefined_university }</p>
                    </div>
                    <div className={ 'holder right' }>
                        <p className={ this.state.number_of_pubs ? 'number_of_publications' : 'number_of_publications hide' }>{ this.state.number_of_pubs }</p>
                        <p className={ this.state.number_of_pubs ? 'publications' : 'publications hide' }>
                            {dictionary.publications}
                        </p>
                    </div>
                </div>
                <PanelTilesList model={ this.model } tilesFactory={ this.tilesFactory } />
            </section>
        );
    }

}

Panel.propTypes = {

    selected_auth: PropTypes.number,
    update_show_co_authors: PropTypes.func,
    switchAuthor: PropTypes.func,
    homeSelf: PropTypes.any

}
