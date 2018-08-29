import React from 'react';

import consts from './consts.js';
import dictionary from './dictionary.js';
import logger from "./utils/logger";


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
                return <Author id={ item_id } name={ item.name + ' ' + item.surname } university={ dictionary.undefined_university } image={ consts.IMG_DEFAULT_AUTHOR } openPanel={ this.openPanel.bind(this.home_self) } types={ item.types } />;

            case consts.TILE_TYPE_PUBLICATIONS:
                return <Publication id={ item_id } title={ item.title } author={ item.authors } venue={ item.venue } type={ item.type } year={ item.year } />;

            default:
                return undefined;
        }

    }

}