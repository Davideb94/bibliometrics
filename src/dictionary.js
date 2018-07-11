import LocalizedStrings from 'react-localization';

const dictionary = new LocalizedStrings({

    en:{
        foo: 'Some text in english'
    },
    it:{
        foo: 'Un testo in italiano'
    }

});

module.exports = dictionary;