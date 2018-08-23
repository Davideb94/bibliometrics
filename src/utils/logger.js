const logger = ( scope, label, content ) => {

    console.log( '%c ************************', 'color: #4CAF50' );
    console.log( '%c [ ' + scope + ' ]', 'color: #4CAF50' );
    console.log( '%c' + label + ':', 'color: #CDDC39' );
    console.log( content );
    console.log( '%c ************************', 'color: #4CAF50' );

};


export default logger;