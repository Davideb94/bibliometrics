import LocalizedStrings from 'react-localization';

const dictionary = new LocalizedStrings({

    en:{
        show_co_authors: 'Show co-authors',
        hide_co_authors: 'Hide co-authors',
        authors: 'AUTHORS',
        tab_publications: 'PUBLICATIONS',
        article: 'Article',
        search: 'Search',
        search_placeholder: 'Authors, publications...',
        publications: 'publications',
        undefined_university: 'unknown university'

    },
    it:{
        show_co_authors: 'Mostra co-autori',
        hide_co_authors: 'Nascondi co-autori',
        authors: 'AUTORI',
        tab_publications: 'PUBLICAZIONI',
        article: 'Articolo',
        search: 'Cerca',
        search_placeholder: 'Autori, publicazioni...',
        publications: 'publicazioni',
        undefined_university: 'università sconosciuta'

    }

});

module.exports = dictionary;