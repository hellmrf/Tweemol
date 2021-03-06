const Twit = require('twit');
const fs = require('fs');

const keys = require('../credentials/twitter.json');

class TweetHandler {
    constructor() {
        this.Twit = new Twit({...keys, timeout_ms: 60000});
    }

    async post(molecule, status, media_data) {
        try{
            // Fazendo upload da imagem
            const mediaUpload = await this.Twit.post('media/upload', {media_data});

            // Cadastrando os metadados da imagem
            const media_id = mediaUpload.data.media_id_string;
            const alt_text = { text: `Chemical structure of ${molecule}.` };
            await this.Twit.post('media/metadata/create', { media_id, alt_text });

            // Postando tweet
            const params = { status, media_ids: [media_id] };
            const response = await this.Twit.post('statuses/update', params);

            return response;

        } catch (err) {
            console.log("[[ERRO | TweetHandler.post()]]: ");
            console.log(err);
            console.log("\n\n\n\n\n\n", media_data);
        }
    }
}


module.exports = TweetHandler;