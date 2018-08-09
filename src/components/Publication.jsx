import React from 'react';
import PropTypes from 'prop-types';

import consts from '../consts.js';



export default class Publication extends React.Component {

    constructor( props ){
        super( props );

        this.id = this.props.id;
        this.title = this.props.title;
        this.author = this.props.author;

        this.state = {
            isSpread: false
        }
    }

    spread(){

        this.setState({
            isSpread: !this.state.isSpread
        });

    }

    render() {

        let _openPublication = () => {

            let id = this.id;
            console.log( 'opening publication: ' + id );

        }

        return (
            <li onClick={ this.spread.bind(this) } className={ this.state.isSpread ? "tile publication spread" : "tile publication" }>
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
                <div onClick={ _openPublication } className={ this.state.isSpread ? 'button_open_publication spread' : 'button_open_publication' }>
                    <img src={ consts.IMG_RIGHT_ARROW } />
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