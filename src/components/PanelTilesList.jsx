import React from 'react';

import consts from "../consts";
import logger from '../utils/logger.js';
import Loader from "./Loader.jsx";

export default class PanelTilesList extends React.Component {

    constructor( props ) {
        super(props);

        this.model = this.props.model;
        this.tilesFactory = this.props.tilesFactory;

        this.state = {
            current_publications: {
                type: consts.TILE_TYPE_PUBLICATIONS,
                items: []
            },
            loaded_publications: 10,
            contentIsLoaded: false,
        };

        //-- listeners --//
        window.addEventListener( consts.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE, () => {
           this._updateCurrentTiles( this.model );
        } );

        window.addEventListener( consts.EVENT_ON_CLOSE_PANEL, () => {
            this.onClosePanel();
        } );

    }

    componentDidMount(){

        let publications_holder = document.getElementById( 'panel_publications_holder' );
        let publications_list = document.getElementById( 'panel_publications_list' );

        publications_holder.addEventListener( consts.EVENT_SCROLL, () => {
            if ( publications_holder.offsetHeight + publications_holder.scrollTop + 1 >= publications_list.offsetHeight ) {
                this.loadMorePubs();
            }
        });

    }

    loadMorePubs(){

        this.setState({
            loaded_publications: this.state.loaded_publications + 10
        });

    }

    onClosePanel(){

        this.setState({
            current_publications: {
                type: consts.TILE_TYPE_PUBLICATIONS,
                items: []
            },
            loaded_publications: 10
        });

    }

    _updateCurrentTiles( model ){

        this.setState({
            current_publications: model.current_publications
        });

    }

    _renderTiles( data ){

        let list = [];

        if( data.items.length != 0 ){
            //watch out for exp complexity
            for( let item in data.items ){
                if( item < this.state.loaded_publications ){
                    // !!!! item is not the actual publication id
                    list.push( this.tilesFactory.build( data.type, item, data.items[item] ) );
                }
            }

        }

        return list;

    }

    render() {

        logger( 'PanelTilesList, render', 'this.state.contentIsLoaded', this.state.contentIsLoaded );

        return (
            <div id={ 'panel_publications_holder' } className={ 'body' }>
                <Loader show={ this.state.current_publications.items.length == 0 ? true : false } />
                <ul>
                    <div id={ 'panel_publications_list' }>
                        <div className={ 'panel_publications_list_wrapper' }>
                        { this._renderTiles( this.state.current_publications ) }
                        </div>
                    </div>
                </ul>
            </div>
        );

    }

}