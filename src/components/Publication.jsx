import React from 'react';
import PropTypes from 'prop-types';



export default class Publication extends React.Component {

    constructor( props ){

        super( props );
        this.id = this.props.id;

    }

    render() {

        let _openPublication = () => {

            let id = this.id;
            console.log( 'opening publication: ' + id );

        }

        return (
            <li onClick={ _openPublication } className={ "tile" }>

            </li>
        );
    }

}

Publication.propTypes = {
    id: PropTypes.number, //may be temporary
}