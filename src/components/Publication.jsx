import React from 'react';
import PropTypes from 'prop-types';



export default class Publication extends React.Component {

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

Publication.propTypes = {

    id: PropTypes.number, //may be temporary
    openPanel: PropTypes.func

}