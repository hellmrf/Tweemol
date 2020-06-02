const { chooseMolecule, saveServer } = require('./src/chooseMolecule');
const { getStructureImage } = require('./src/images');
const Wiki = require('./src/wikipedia');
const Text = require('./src/text');
const TweetHandler = require('./src/TweetHandler');

class Main {
    constructor(){
        this.wiki = new Wiki();
        this.text = new Text();
        this.TweetHandler = new TweetHandler();
    }
    async start(){
        const molecule = await chooseMolecule();
        const wikiPage = await this.wiki.getWikiIntroText(molecule);
        const properties = await this.wiki.getProperties();
        const image = await getStructureImage(properties.image, properties.smiles, molecule);
        const tweet = await this.text.prepareSummary(wikiPage.extract, Wiki.getPageLinkByTitle(molecule), molecule);
        await this.TweetHandler.post(molecule, tweet, image);
        await saveServer(molecule);
    }
}

(async ()=>{
    for(let i = 0; i < 10; i++){
        try{
            const mainInstance = new Main();
            await mainInstance.start();
            break;
        } catch (err) {
            console.log(`\n\n\n[[ERRO | MAIN]]: Processo falhou pela ${i+1}ª vez.\n${err}\n\n`);
        }
    }
})();