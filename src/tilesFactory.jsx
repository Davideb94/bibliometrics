import React from 'react';
import consts from './consts.js';

import Author from './components/Author.jsx';
import Publication from './components/Publication.jsx';

export default class tilesFactory {

    constructor( openPanel, home_self ){

        this.openPanel = openPanel;
        this.home_self = home_self;

    }

    build( type, item_id, item ) {

        switch ( type ) {
            case consts.TILE_TYPE_AUTHORS:
                return <Author id={ item_id } name={ item.name + ' ' + item.surname } university={ 'not specified' } image={ consts.IMG_DEFAULT_AUTHOR } openPanel={ this.openPanel.bind(this.home_self) } />;

            case consts.TILE_TYPE_PUBLICATIONS:
                return <Publication id={ item_id } title={ item.title } author={ item.authors } type={ item.type }/>;

            default:
                return undefined;
        }

    }

}