import React from 'react';
import PropTypes from 'prop-types';
import dictionary from '../dictionary';



export default class Tile extends React.Component {

    render() {
        return (
            <li onClick={ this.props.callPanel } className={ "tile" }>
                <p>{ dictionary.foo }</p>
            </li>
        );
    }

}

Tile.propTypes = {

    openPanel: PropTypes.func

}