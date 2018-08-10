import LocalizedStrings from 'react-localization';

const dictionary = new LocalizedStrings({

    en:{
        show_co_authors: 'Show co-authors',
        hide_co_authors: 'Hide co-authors',
        authors: 'AUTHORS',
        publications: 'PUBLICATIONS',
        article: 'Article',
        search: 'Search'
    },
    it:{
        show_co_authors: 'Mostra co-autori',
        hide_co_authors: 'Nascondi co-autori',
        authors: 'AUTORI',
        publications: 'PUBLICAZIONI',
        article: 'Articolo',
        search: 'Cerca'
    }

});

module.exports = dictionary;