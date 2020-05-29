const google = require('googleapis').google;
const googleSearchCredentials = require('../credentials/google-search.json');
const customSearch = google.customsearch('v1');
const { parse } = require('node-html-parser');
const axios = require('axios');

const getStructure = async (wikiImageName, wikiSMILES = null, moleculeName = null) => {
    if (wikiImageName) {
        // Baixar da Wikipédia
        const wikimediaDescriptionTitle = `File:${wikiImageName}`;
        const wikiImageURL = await getImageURLFromDescriptionPage(wikimediaDescriptionTitle);
        if (wikiImageURL) {
            return wikiImageURL;
        }
    } else if (moleculeName) {
        return "Google";
        // Pesquisar no Google
        const googleSearchResult = await searchImageInGoogle(moleculeName);
        return googleSearchResult;
    }
    return wikiImageName;
};
const getImageURLFromDescriptionPage = async descriptionPageTitle => {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            'action': 'query',
            'format': 'json',
            'prop': 'imageinfo',
            'titles': descriptionPageTitle,
            'redirects': 1,
            'formatversion': 2,
            'iiprop': 'url'
        }
    });
    return response.data.query.pages[0].imageinfo[0].url;;
}

const searchImageInGoogle = async searchTerm => {
    const response = await customSearch.cse.list({
        auth: googleSearchCredentials.API_KEY,
        cx: googleSearchCredentials.search_engine_id,
        q: searchTerm + ' structure chemistry',
        searchType: 'image',
        num: 1
    });
    /*
        Por algum motivo estranho, a API do Google retorna um objeto que não contém um resultado, mas uma propriedade request.responseURL. Essa propriedade é um link para um JSON que contém o resultado real procurado. Por esse motivo, estou fazendo duas requisições: uma para receber a responseURL e outra para ler o objeto em responseURL.
     */
    const responseResponse = await axios.get(response.request.responseURL);
    return responseResponse.data.items[0].link;
}
module.exports = getStructure;