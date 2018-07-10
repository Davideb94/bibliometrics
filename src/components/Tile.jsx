import React from 'react';


export default class Tile extends React.Component {

    onTileClick(){

        console.log("[tile]: CLICKED!");

    }

    render() {
        return (
            <li onClick={ this.onTileClick } className={ "tile" }>

            </li>
        );
    }

}