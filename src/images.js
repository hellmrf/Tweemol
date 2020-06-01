const fs = require('fs');
const path = require('path');
const axios = require('axios');
const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const imageDownloader = require('image-downloader');
const sharp = require('sharp');

const googleSearchCredentials = require('../credentials/google-search.json');

const IMAGES_PATH = path.join(__dirname, '../temp_images');

/*
    Path -> local address to image file
    URL  -> web address to image file
*/
const getStructurePath = async (wikiImageName, wikiSMILES = null, moleculeName = null) => {
    const URL = await getStructureURL(wikiImageName, moleculeName);
    let path = "";
    // TODO: Desenhar molécula a partir do SMILES a URL não for encontrado e o SMILES sim
    const originalImagePath = await downloadImage(URL);
    path = await convertImageToPNG(originalImagePath);
    return path;
}

const getStructureURL = async (wikiImageName, moleculeName = null) => {
    if (wikiImageName) {
        // Baixar da Wikipédia
        const wikimediaDescriptionTitle = `File:${wikiImageName}`;
        const wikiImageURL = await getImageURLFromDescriptionPage(wikimediaDescriptionTitle);
        if (wikiImageURL) {
            return wikiImageURL;
        }
    } else if (moleculeName) {
        // Pesquisar no Google
        const googleSearchResult = await searchImageOnGoogle(moleculeName);
        return googleSearchResult;
    }
    return wikiImageName;
};

const downloadImage = async url => {
    try {
        const response = await imageDownloader.image({url, dest: IMAGES_PATH});
        const { filename } = response;
        return filename;
    }catch (err) {
        console.log("[[ERRO | IMAGE-DOWNLOADER]]\n\n");
        console.log(err);
        return "";
    }
};

const convertImageToPNG = async originalImagePath => {
    const newPath = originalImagePath.substr(0, originalImagePath.length-4) + "_converted.png";
    try {
        await sharp(originalImagePath)
            .png()
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .toFile(newPath);
        return newPath;
    } catch (err) {
        console.log("[[ERRO | SHARP]]");
        console.log(err);
        return;
    }
};

const getImageURLFromDescriptionPage = async descriptionPageTitle => {
    try{
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
        return response.data.query.pages[0].imageinfo[0].url;
    } catch (err){
        console.log("[[ERRO | AXIOS]]") 
        console.log("src/getStructure.js, getImageURLFromDescriptionPage", err);
    }
}

const searchImageOnGoogle = async searchTerm => {
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

const clearTempDirectory = () => {
    fs.readdir(IMAGES_PATH, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(IMAGES_PATH, file), err => {
                if (err) throw err;
            });
        }
    });
}

exports.clearTempDirectory = clearTempDirectory;
exports.getStructurePath = getStructurePath;