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
        undefined_university: 'Insitute not specified',
        authors_not_found: 'No authors found with surname "',
        publications_not_found: 'No publications found titled "',
        not_found_label: 'Please make sure your words are spelled correctly',
        location_not_specified: 'Venue not specified',
        date_field: 'Filter by year',
        from: 'From',
        to: 'To',
        apply_filter: 'APPLY',
        remove_filter: 'REMOVE',

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
        undefined_university: 'Istituto non specificato',
        authors_not_found: 'Nessun autore trovato con cognome "',
        publications_not_found: 'Nessuna publicazione trovato intitolata "',
        not_found_label: 'Assicurati di aver scritto correttamente ogni parola',
        location_not_specified: 'Sede non specificata',
        date_field: 'Filtra per anno',
        from: 'Da',
        to: 'A',
        apply_filter: 'APPLICA',
        remove_filter: 'RIMUOVI',

    }

});

export default dictionary;
