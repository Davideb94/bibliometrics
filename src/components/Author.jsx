import React from 'react';
import PropTypes from 'prop-types';
import consts from '../consts.js';



export default class Author extends React.Component {

    constructor( props ){
        super( props );

        this.id = this.props.id;
        this.name = this.props.name;
        this.university = this.props.university;
        this.image = this.props.image;
    }

    render() {

        return (
            <li onClick={ () => {this.props.openPanel( this.id )} } className={ "tile author" }>
                <div className={ 'left_holder' }>
                    <div className={ 'img_holder' }>
                        <img src={ this.image } />
                    </div>
                    <div className={ 'name_holder' }>
                        <p>{ this.name }</p>
                    </div>
                </div>
                <div className={ 'right_holder' }>
                    <div className={ 'university_holder' }>
                        <p>{ this.university }</p>
                    </div>
                </div>
            </li>
        );
    }

}

Author.propTypes = {

    id: PropTypes.number, //may be temporary
    name: PropTypes.string,
    university: PropTypes.string,
    image: PropTypes.string,

    openPanel: PropTypes.func

}
