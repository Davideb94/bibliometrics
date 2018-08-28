import React from 'react';
import PropTypes from 'prop-types';

import consts from '../consts.js';
import types from '../publication_types.js';
import logger from "../utils/logger.js";



export default class Author extends React.Component {

    constructor( props ){
        super( props );

        this.id = this.props.id;
        this.name = this.props.name;
        this.university = this.props.university;
        this.image = this.props.image;
        this.types = types;

        this.openPanel = this.props.openPanel;
        //onClick={ () => {this.props.openPanel( this.id )} }

        this.state = {

            id: this.id,
            isSpread: false

        }

    }

    spread(){

        this.setState({
            isSpread: !this.state.isSpread
        });

    }


    render() {

        logger( 'Author, render', 'this.props.name', this.props.name );
        logger( 'Author, render', 'this.props.types', this.props.types );

        let style_0 = {
            background: this.props.types[0] ? this.props.types[0].color : ''
        };

        let style_1 = {
            background: this.props.types[1] ? this.props.types[1].color : ''
        };

        let style_2 = {
            background: this.props.types[2] ? this.props.types[2].color : ''
        };

        return (
            <li onClick={ this.spread.bind(this) } className={ this.state.isSpread ? "tile author spread" : "tile author" }>
                <div className={ 'left_holder' }>
                    <div className={ 'img_holder' }>
                        <img src={ this.props.image } />
                    </div>
                    <div className={ this.state.isSpread ? 'name_holder spread' : 'name_holder' }>
                        <div className={ 'name_holder_inner' }>
                            <p>{ this.props.name }</p>
                        </div>
                        <div className={ 'co_authors_inner' }></div>
                    </div>
                </div>
                <div className={ 'right_holder' }>
                    <div className={ 'university_holder' }>
                        <div className={ 'university' }>
                            <p>{ this.props.university }</p>
                        </div>
                        <div className={ this.state.isSpread ? 'publication_types spread' : 'publication_types' }>
                            <div className={ 'publication_type'  } style={ style_0 } >
                                <p>{ this.props.types[0] ? this.props.types[0].name : '' }</p>
                            </div>
                            <div className={ 'publication_type' } style={ style_1 } >
                                <p>{ this.props.types[1] ? this.props.types[1].name : '' }</p>
                            </div>
                            <div className={ 'publication_type' } style={ style_2 } >
                                <p>{ this.props.types[2] ? this.props.types[2].name : '' }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={ () => {this.props.openPanel( this.props.id )} } className={ this.state.isSpread ? 'button_open_panel spread' : 'button_open_panel' }>
                    <img src={ consts.IMG_RIGHT_ARROW } />
                </div>
            </li>
        );
    }

}

Author.propTypes = {

    id: PropTypes.number,
    name: PropTypes.string,
    university: PropTypes.string,
    image: PropTypes.string,

    openPanel: PropTypes.func,
    types: PropTypes.object

}
