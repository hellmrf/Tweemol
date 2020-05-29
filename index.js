const chooseMolecule = require('./src/chooseMolecule');
const getStructure = require('./src/getStructure');
const Wiki = require('./src/wikipedia');
const Text = require('./src/text');

class Main {
    constructor(){
        this.wiki = new Wiki();
        this.text = new Text();
    }
    async start(){
        //TODO: molécula não é escolhida
        // const molecule = chooseMolecule();
        const molecule = "alanine";
        const wikiPage = await this.wiki.getWikiIntroText(molecule);
        const properties = await this.wiki.getProperties();
        //TODO: cancelei a imagem para testar a geração via smiles.
        properties.image = "";
        const image = await getStructure(properties.image, properties.smiles, molecule);
        const tweet = await this.text.prepareSummary(wikiPage.extract, Wiki.getPageLinkByTitle(molecule), molecule);
        console.log("molecule: ", molecule)
        // console.log("tweet: ", tweet)
        console.log("\nimage:", image)
        console.log("smiles", properties.smiles)
        // console.log("\nproperties:", properties)
    }

    // TODO mover isso para src/getStructure.js.
    getImage(molecule, wiki_image_url){
        return wiki_image_url || undefined
    }
}

const mainInstance = new Main();
mainInstance.start();