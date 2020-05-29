const chooseMolecule = require('./src/chooseMolecule');
// const getStructure = require('./src/getStructure')
const Wiki = require('./src/wikipedia');
const Text = require('./src/text');

class Main {
    constructor(){
        this.wiki = new Wiki();
        this.text = new Text();
    }
    async start(){
        const molecule = chooseMolecule();
        const wikiPage = await this.wiki.getWikiIntroText(molecule);
        const properties = await this.wiki.getProperties();
        const image = this.getImage(molecule, properties.image);
        const tweet = await this.text.prepareSummary(wikiPage.extract, Wiki.getPageLinkByTitle(molecule), molecule);
        console.log(tweet)
    }

    // TODO mover isso para src/getStructure.js.
    getImage(molecule, wiki_image_url){
        return wiki_image_url ? wiki_image_url : undefined
    }
}

const mainInstance = new Main();
mainInstance.start();