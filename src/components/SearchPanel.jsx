import React from "react";
import dictionary from "../dictionary.js";
import * as consts from "../consts";
import logger from "../utils/logger";
import PropTypes from "prop-types";


export default class SearchPanel extends React.Component {

    constructor( props ){
        super( props );

        this.input = null;
        this.updateHomeKeyword = this.props.updateKeyword;
        this.openSearch = this.props.openSearch;
        this.updateSearch = this.props.updateSearch;
    }

    componentDidMount(){

        this.input = document.getElementById( 'input_search' );
        this.input.addEventListener( consts.EVENT_KEYUP, (e) => {
            this.onKeyPress(e);
        } );

    }

    onKeyPress( e ){

        let key = e.which || e.keyCode;

        this.updateHomeKeyword( this.input.value );

        switch( key ){
            case 13:    // keypress ENTER
                if( this.props.isOpened ){
                    this.openSearch();
                    this.updateSearch();
                }
                break;

            case 27:    // keypress ESC
                if( this.props.isOpened ){
                    this.openSearch();
                    this.updateSearch();
                }
                break;

            case 32:    // keypress SPACE

                break;
        }

    }

    giveFocus(){
        this.input.focus();
    }

    render() {

        return (
            <div className={ this.props.className }>
                <input id={ 'input_search' } type={ 'text' } placeholder={ dictionary.search_placeholder } />
            </div>
        );
    }

}

SearchPanel.propTypes = {

    updateKeyword: PropTypes.func,
    openSearch: PropTypes.func,
    isOpened: PropTypes.bool,
    updateSearch: PropTypes.func,

};