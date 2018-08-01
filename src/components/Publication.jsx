import React from 'react';
import PropTypes from 'prop-types';



export default class Publication extends React.Component {

    constructor( props ){
        super( props );

        this.id = this.props.id;
        this.title = this.props.title;
        this.author = this.props.author;
    }

    render() {

        let _openPublication = () => {

            let id = this.id;
            console.log( 'opening publication: ' + id );

        }

        return (
            <li onClick={ _openPublication } className={ "tile publication" }>
                <div className={ 'left_holder' }>
                    <p className={ 'title' }>
                        { this.title }
                    </p>
                </div>
                <div className={ 'right_holder' }>
                    <p className={ 'author' }>
                        { this.author }
                    </p>
                </div>
            </li>
        );
    }

}

Publication.propTypes = {
    id: PropTypes.number, //may be temporary
    title: PropTypes.string,
    author: PropTypes.string
}