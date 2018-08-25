const logger = ( scope, label, content ) => {

    console.log( '%c [ ' + scope + ' ]', 'color: #CDDC39' );
    console.log( '%c' + label + ':', 'color: #4CAF50' );
    console.log( content );

};


export default logger;