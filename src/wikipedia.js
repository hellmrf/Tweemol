const axios = require('axios');


class Wiki {
    constructor(molecule = null){
        this.pagetext;
        this.molecule = molecule;
    }

    async getWikiIntroText(titles = null) {
        if(!this.verifyIfMoleculeWereInitialized(titles)) return;
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                'action': 'query',
                'format':'json',
                'prop':'extracts',
                'titles':this.molecule,
                'redirects':1,
                'exintro':1,
                'explaintext':1,
                'formatversion':2,
                export:1
            },
            "timeout": 10000
        });
        const { query } = response.data;
        const { pageid, title, extract } = query.pages[0]
        this.pagetext = query['export']
        return { pageid, title, extract };
    }

    async getProperties(molecule = null) {
        if(!this.verifyIfMoleculeWereInitialized(molecule)) return;
        if(!this.pagetext){
            await this.getWikiIntroText();
        }
        const dataWithoutComments = this.sanitizeData(this.pagetext);
        const dataArray = dataWithoutComments.split('\n').filter(line=>(line.length>0));
        const drugData = dataArray.filter(line => line.startsWith('|')).map(line => line.substr(2));
        const drugInfoObject = {}
        for (const elem of drugData) {
            const arr = elem.split(' =').map(sub => sub.trim())
            const idx = arr[0].toLowerCase().replace('imagefile','image');
            drugInfoObject[idx] = arr[1]
        };
        return drugInfoObject;
    }

    static getPageLinkByTitle(title) {
        return `https://en.wikipedia.org/wiki/${title}`;
    }

    verifyIfMoleculeWereInitialized(molecule){
        if(this.molecule === null){
            if(molecule === null){
                return false;
            }else{
                this.molecule = molecule
            }
        }
        return true;
    }

    sanitizeData(data) {
        const dataEntitiesDecoded = data.replace(/&gt;/g,'>').replace(/&lt;/g,'<');
        const dataWithoutComments = dataEntitiesDecoded.replace(/<!--(.*?)-->/g,'');
        return dataWithoutComments;
    }

}

module.exports = Wiki;