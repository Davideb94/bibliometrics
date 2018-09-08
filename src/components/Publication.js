import React from 'react';
import PropTypes from 'prop-types';

import consts from '../consts';
import dictionary from '../dictionary';
import types from '../publication_types';
import logger from "../utils/logger";



export default class Publication extends React.Component {

    constructor( props ){
        super( props );

        this.id = this.props.id;
        this.title = this.props.title;
        this.author = this.props.author;
        this.venue = this.props.venue;
        this.type = this.props.type;

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

        let dynamic_style = {
            background: types[ this.props.type ].color
        };

        return (
            <li onClick={ this.spread.bind(this) } className={ this.state.isSpread ? "tile publication spread" : "tile publication" }>
                <div className={ 'left_holder' }>
                    <div className={ 'title' }>
                        <p>
                            { this.props.title }
                        </p>
                    </div>
                    <div className={ 'pubblication_type' } style={ dynamic_style } >
                        <p>
                            { types[ this.props.type ].name }
                        </p>
                    </div>
                </div>
                <div className={ 'right_holder' }>
                    <div className={ 'author' }>
                        <p>{ this.props.author }</p>
                    </div>
                    <div className={ 'source' }>
                        <p className={ 'year' }>{ this.props.year }</p>
                        <p>{ this.props.venue ? this.props.venue : dictionary.location_not_specified }</p>
                    </div>
                </div>
            </li>
        );
    }

}

Publication.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    type: PropTypes.string,
    venue: PropTypes.string,
    year: PropTypes.string
}
