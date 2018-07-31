import React from 'react';
import PropTypes from 'prop-types';



export default class Tile extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            //-- UI INFO --//

            //-- MODEL DATA --//
            id: this.props.id
        }
    }

    render() {
        return (
            <li onClick={ () => {this.props.openPanel( this.state.id )} } className={ "tile" }>

            </li>
        );
    }

}

Tile.propTypes = {

    id: PropTypes.number, //may be temporary
    openPanel: PropTypes.func

}