const chooseMolecule = require('./src/chooseMolecule');
const { getStructurePath, clearTempDirectory } = require('./src/images');
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
        const molecule = chooseMolecule();
        const wikiPage = await this.wiki.getWikiIntroText(molecule);
        const properties = await this.wiki.getProperties();
        const imagePath = await getStructurePath(properties.image, properties.smiles, molecule);
        const tweet = await this.text.prepareSummary(wikiPage.extract, Wiki.getPageLinkByTitle(molecule), molecule);
        const posting = await this.TweetHandler.post(molecule, tweet, imagePath);

        console.log("Molecule: ".black.bgGreen, molecule);
        console.log("\nTweet: ".black.bgGreen, tweet);
        console.log("\nImage:".black.bgGreen, imagePath);
        // console.log("\nTwit response:".black.bgGreen, posting);
        // console.log("\nProperties: ".black.bgGreen, properties);
    }
}

(async ()=>{
    for(let i = 0; i < 10; i++){
        try{
            const mainInstance = new Main();
            await mainInstance.start();
            clearTempDirectory();
            break;
        } catch (err) {
            console.log(`\n\n\n[[ERRO | MAIN]]: Processo falhou pela ${i+1}ª vez.\n${err}\n\n`);
        }
    }
})();

// const mI = {}
// for(let i = 0; i < 50; i++){
//     mI[i] = new Main();
//     mI[i].start();
// }