import React from 'react';
import PropTypes from 'prop-types';



export default class Tile extends React.Component {

    render() {
        return (
            <li onClick={ this.props.openPanel } className={ "tile" }>

            </li>
        );
    }

}

Tile.propTypes = {
    openPanel: PropTypes.func
}