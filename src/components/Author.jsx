import React from 'react';
import PropTypes from 'prop-types';



export default class Author extends React.Component {

    constructor( props ){
        super( props );
        this.id = this.props.id;
    }

    render() {

        return (
            <li onClick={ () => {this.props.openPanel( this.id )} } className={ "tile" }>

            </li>
        );
    }

}

Author.propTypes = {

    id: PropTypes.number, //may be temporary
    openPanel: PropTypes.func

}