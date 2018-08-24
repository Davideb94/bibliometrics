import React from 'react';

import consts from "../consts";
import logger from '../utils/logger.js';

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
            loaded_publications: 10
        };

        //-- listeners --//
        window.addEventListener( consts.EVENT_CURRENT_PUBLICATIONS_DID_CHANGE, () => {
           this._updateCurrentTiles( this.model );
        } );

        window.addEventListener( consts.EVENT_ON_CLOSE_PANEL, () => {
            this.onClosePanel();
        } );
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

        return (
            <div className={ 'body' }>
                <ul>
                    { this._renderTiles( this.state.current_publications ) }
                </ul>
            </div>
        );

    }

}