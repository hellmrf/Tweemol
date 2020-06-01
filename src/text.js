const Algorithmia = require('algorithmia');
const twttr = require('twitter-text');
const sbd = require('sbd');
const { API_KEY } = require('../credentials/algorithmia.json')

const DEFAULT_LANGUAGE = 'en';

class Text {
    async prepareSummary(text, link, molecule, lang = DEFAULT_LANGUAGE){
        const tweet = this.buildTweet(text, link, lang);
        if(!this.checkTweetLength(tweet)){
            // Resumir o texto.
            const summarized = await this.summarizeText(text.trim());
            const tweet = this.buildTweet(summarized, link, lang);
            if(!this.checkTweetLength(tweet)){
                const lastTry = this.buildTweet(this.getFirstSentence(summarized), link, lang);
                return (this.checkTweetLength(lastTry)) ? lastTry : this.getGenericTweet(molecule, link, lang);
            }
            return tweet;
        }
        return tweet;
    }
    async summarizeText(text) {
        // TODO: para economizar créditos no Algorithmia, desabilitei este método.
        return "Norethisterone, also known as norethindrone and sold under many brand names, is a progestin medication used in birth control pills, menopausal hormone therapy, and for the treatment of gynecological disorders. Norethisterone was discovered in 1951 and was one of the first progestins to be developed.";
        const algoResponse = await Algorithmia.client(API_KEY)
            .algo("nlp/Summarizer/0.1.8?timeout=300")
            .pipe([text,2]);
        return (algoResponse.status == 200) ? algoResponse.result : text;
    }
    
    getFirstSentence(text) {
        return sbd.sentences(text)[0];
    }

    buildTweet (text, link, lang = DEFAULT_LANGUAGE) {
        const callToAction = lang==='pt' ? "Saiba mais" : "Know more";
        const tweet = `${text}\n${callToAction}: ${link}`;
        return tweet;
    }

    checkTweetLength(tweet) {
        return (twttr.parseTweet(tweet).weightedLength <= 280);
    }

    getGenericTweet(molecule, link, lang = DEFAULT_LANGUAGE){
        if(lang==='pt'){
            return this.buildTweet(`Today's drug is ${molecule}.`, link, lang);
        }else{
            return this.buildTweet(`O fármaco de hoje é ${molecule}.`, link, lang);
        }
            
    }
}

module.exports = Text;
