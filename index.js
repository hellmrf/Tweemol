const axios = require('axios');

async function getIntroText(titles) {
    const response = await axios.get('https://pt.wikipedia.org/w/api.php', {
        params: {
            'action': 'query',
            'format':'json',
            'prop':'extracts',
            'titles':titles,
            'redirects':1,
            'exintro':1,
            'explaintext':1,
        }
    });
    const { pages } = response.data.query;
    const { title, extract } = pages[Object.keys(pages)[0]]
    
}

getIntroText('Harmalina');