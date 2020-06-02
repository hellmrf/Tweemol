const { molecules } = require('../all_molecules.json');
const fs = require('fs');
const path = require('path');
// const Server = require('./server');

const POSTED_ARRAY_PATH = path.resolve(__dirname, '../molecules_posted.json');

const chooseMolecule = () => {
    const posted = readServer();
    let moleculeOfTheDay
    do {
        const rand = Math.floor(Math.random() * molecules.length);
        moleculeOfTheDay = molecules[rand];
    } 
    while (posted.indexOf(moleculeOfTheDay) > -1);
    posted.push(moleculeOfTheDay);
    saveServer(posted);
    return moleculeOfTheDay;
}

const readServer = () => {
    const data = fs.readFileSync(POSTED_ARRAY_PATH);
    const { posted } = JSON.parse(data);
    return posted
}
const saveServer = (posted) => {
    fs.writeFileSync(POSTED_ARRAY_PATH, JSON.stringify({ "posted" : posted }));
}
module.exports = chooseMolecule;