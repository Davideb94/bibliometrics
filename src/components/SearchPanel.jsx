import React from "react";
import dictionary from "../dictionary.js";


export default class SearchPanel extends React.Component {

    constructor( props ){
        super( props );

        this.input = null;
        this.updateHomeKeyword = this.props.updateKeyword;

        this.state = {
            keyword: null
        }
    }

    componentDidMount(){
        this.input = document.getElementById( 'input_search' );
    }

    giveFocus(){
        this.input.focus();
    }

    _onKeyPress(){

        this.setState({
            keyword: this.input.value
        });

        window.setTimeout( () => {
            this.updateHomeKeyword( this.state.keyword );
        }, 50 );

    }

    render() {

        return (
            <div className={ this.props.className }>
                <input id={ 'input_search' } type={ 'text' } placeholder={ this.state.keyword ? this.state.keyword : dictionary.search } onKeyUp={ this._onKeyPress.bind(this) }/>
            </div>
        );
    }

}