import React from 'react';
import PropTypes from 'prop-types';

import consts from '../consts.js';
import dictionary from '../dictionary.js';



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
                        { this.props.title }
                    </p>
                    <div className={ 'pubblication_type' }>
                        <div className={ 'chip' }>
                            <p>
                                { dictionary.article }
                            </p>
                        </div>
                    </div>
                </div>
                <div className={ 'right_holder' }>
                    <p className={ 'author' }>
                        { this.props.author }
                    </p>
                    <div className={ 'source' }>
                        <span>
                            <p>2012, Newspaper X</p>
                        </span>
                    </div>
                </div>
                <div onClick={ _openPublication } className={ this.state.isSpread ? 'button_open_publication spread' : 'button_open_publication' }>
                    <img src={ consts.IMG_RIGHT_ARROW } />
                </div>
            </li>
        );
    }

}

Publication.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    type: PropTypes.string
}