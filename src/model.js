import consts from "./consts";

const model = {


    _authors: {

        type: consts.TILE_TYPE_AUTHORS,
        items: [
            {
                id: 1,
                name: 'Roberto Brotto',
                university: 'University of Los Angeles',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 2,
                name: 'Giovanni Fabbri',
                university: 'Università Politecnica delle Marche',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 3,
                name: 'Silvia Manfreda',
                university: 'Università degli Studi di Bari',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 4,
                name: 'Abate Angelo',
                university: 'Politecnico di Torino',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 5,
                name: 'Mario Rossi',
                university: 'Politecnico di Torino',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 6,
                name: 'Giuseppe Nieri',
                university: 'Università di Siena',
                image: consts.IMG_DEFAULT_AUTHOR
            },
            {
                id: 7,
                name: 'Andrea Einaudi',
                university: 'Politecnico di Milano',
                image: consts.IMG_DEFAULT_AUTHOR
            },

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