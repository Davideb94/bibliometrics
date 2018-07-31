import consts from "./consts";

const model = {


    _authors: {

        type: consts.TILE_TYPE_AUTHORS,
        items: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6},
            {id: 7}
        ]

    },

    _publications: {

        type: consts.TILE_TYPE_PUBLICATIONS,
        items: [
            {id: 1},
            {id: 2},
            {id: 3}
        ]

    }


};

module.exports = model;