import React from 'react';
import consts from './consts.js';

import Author from './components/Author.jsx';
import Publication from './components/Publication.jsx';

export default class tilesFactory {

    constructor( openPanel, home_self ){

        this.openPanel = openPanel;
        this.home_self = home_self;

    }

    build( type, item ) {

        switch ( type ) {
            case consts.TILE_TYPE_AUTHORS:
                return <Author id={ item.id } name={ item.name } university={ item.university } image={ item.image } openPanel={ this.openPanel.bind(this.home_self) } />;

            case consts.TILE_TYPE_PUBLICATIONS:
                return <Publication id={ item.id } />;

            default:
                return undefined;
        }

    }

}