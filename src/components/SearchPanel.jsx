import React from "react";
import dictionary from "../dictionary.js";


export default class SearchPanel extends React.Component {

    constructor( props ){
        super( props );

        this.input = null;
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

        console.log( '[SearchPanel] input value: ' + this.input.value );
        window.setTimeout( () => {
            console.log( '[SearchPanel] keyword: ' + this.state.keyword );
        }, 500 );

    }

    render() {

        return (
            <div className={ this.props.className }>
                <input id={ 'input_search' } type={ 'text' } placeholder={ this.state.keyword ? this.state.keyword : dictionary.search } onKeyUp={ this._onKeyPress.bind(this) }/>
            </div>
        );
    }

}