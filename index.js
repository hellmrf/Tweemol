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
        const molecule = chooseMolecule();
        // const molecule = "Pepstatin";
        const wikiPage = await this.wiki.getWikiIntroText(molecule);
        const properties = await this.wiki.getProperties();
        const image = await getStructure(properties.image, properties.smiles, molecule);
        const tweet = await this.text.prepareSummary(wikiPage.extract, Wiki.getPageLinkByTitle(molecule), molecule);
        console.log("molecule: ", molecule)
        console.log("tweet: ", tweet)
        console.log("\nimage:", image)
        // console.log("smiles", properties.smiles)
        // console.log("\nproperties:", properties)
    }
}

const mainInstance = new Main();
mainInstance.start();
// const mI = {}
// for(let i = 0; i < 20; i++){
//     mI[i] = new Main();
//     mI[i].start();
// }