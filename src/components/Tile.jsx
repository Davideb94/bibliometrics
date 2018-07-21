import React from 'react';
import PropTypes from 'prop-types';



export default class Tile extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
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
    openPanel: PropTypes.func
}