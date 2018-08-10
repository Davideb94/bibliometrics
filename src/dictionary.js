import LocalizedStrings from 'react-localization';

const dictionary = new LocalizedStrings({

    en:{
        show_co_authors: 'Show co-authors',
        hide_co_authors: 'Hide co-authors',
        authors: 'AUTHORS',
        tab_publications: 'PUBLICATIONS',
        article: 'Article',
        search: 'Search',
        publications: 'publications'

    },
    it:{
        show_co_authors: 'Mostra co-autori',
        hide_co_authors: 'Nascondi co-autori',
        authors: 'AUTORI',
        tab_publications: 'PUBLICAZIONI',
        article: 'Articolo',
        search: 'Cerca',
        publications: 'publicazioni'

    }

});

module.exports = dictionary;