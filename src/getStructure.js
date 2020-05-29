// const google = require('googleapis').google;
// const googleSearchCredentials = require('../credentials/google-search.json');
const { parse } = require('node-html-parser');
const axios = require('axios');

const getStructure = async (wikiImageName, wikiSMILES = null, moleculeName = null) => {
    if(wikiImageName) {
        // Baixar da Wikipédia
        const wikimediaDescriptionTitle = `File:${wikiImageName}`;
        const wikiImageURL = await getImageURLFromDescriptionPage(wikimediaDescriptionTitle);
        if(wikiImageURL){
            return wikiImageURL;
        }
    }else if(moleculeName){
        // Pesquisar no Google
    }
    return wikiImageName;
};
const getImageURLFromDescriptionPage = async descriptionPageTitle => {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            'action': 'query',
            'format':'json',
            'prop':'imageinfo',
            'titles':descriptionPageTitle,
            'redirects':1,
            'formatversion':2,
            'iiprop': 'url'
        }
    });
    return response.data.query.pages[0].imageinfo[0].url;;
}
module.exports = getStructure;