const axios = require('axios');
const { molecules } = require('../all_molecules.json');
const { key } = require('../credentials/server.json');

const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const SERVER_URL = "https://tweemol.ongrade.ml/";

const chooseMolecule = async () => {
    const posted = await readServer();
    let moleculeOfTheDay
    do {
        const rand = Math.floor(Math.random() * molecules.length);
        moleculeOfTheDay = molecules[rand];
    } 
    while (posted.indexOf(moleculeOfTheDay) > -1);
    return moleculeOfTheDay;
}

const readServer = async () => {
    const response = await axios.get(SERVER_URL+"getPostedMolecules/");
    const { posted } = response.data;
    console.log(response.data);
    return posted;
}
const saveServer = async (posted) => {
    try {
        const params = new URLSearchParams();
        params.append('secret_key', key);
        params.append('posted_molecule', posted);
        const response = await fetch(SERVER_URL+"addPosted/", {
            method: 'POST',
            body: params
        });
        if(response.status != 200){
            console.log("[RETORNO DO SERVIDOR]:",response.status);
        }
    } catch (err) {
        console.log("[ERRO SALVANDO NO SERVIDOR]", err);
    }
}
exports.chooseMolecule = chooseMolecule;
exports.saveServer = saveServer;