import https from 'https';

class GoogleTranslate {
    static async translate({ from = 'auto', to = 'en', text }) {
        const json = await GoogleTranslate.requestTranslation(from, to, text);
        return GoogleTranslate.getSentenceFromJSON(json);
    }

    static async requestTranslation(from, to, text) {
        if(text.length > 5000) {
            throw new Error('Maximum number of characters exceeded: 5000');
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURI(from)}&tl=${encodeURI(to)}&dt=t&q=${encodeURI(text)}`;

        const response = await new Promise((resolve, reject) => {
            https.get(url, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
                res.on('error', err => reject(err));
            });
        });

        return JSON.parse(response);
    }

    static getSentenceFromJSON(json) {
        if(!Array.isArray(json) || !Array.isArray(json[0]) || !Array.isArray(json[0][0])) {
            throw new Error('Invalid JSON response');
        }

        return json[0][0][0];
    }
}

const translate = ({ from = 'auto', to = 'en', text }) => {
    return GoogleTranslate.translate({ from, to, text });
}

export default translate;