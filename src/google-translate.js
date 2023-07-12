import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

function getSourceLang(option) {
    return option.translateFrom || 'auto';
}

function getTargetLang(option) {
    return option.translateTo || 'en';
}

/**
 * 
 * @param {string} message
 * @param {object} options 
 * @param {string} options.translateFrom
 * @param {string} options.translateTo
 * @returns {Promise<string>}
 */
const translate = async (message, options = {}) => {
    //FIXME: Remove this line when any bug appear
    console.warn = () => {};

    const browser = await puppeteer.use(StealthPlugin()).launch({
        headless: true,
        userDataDir: './user_data'
    });

    const page = await browser.newPage();

    await page.goto(`https://translate.google.com/?sl=${getSourceLang(options)}&tl=${getTargetLang(options)}&op=translate`);

    //FIXME: INPUT BOX
    const sourceInput = await page.$('textarea[aria-label="Source text"]');
    
    await sourceInput.type(message);

    await page.waitForSelector(`textarea[lang="${getTargetLang(options)}"]`);

    //FIXME: OUTPUT BOX
    const targetInput = await page.$(`textarea[lang="${getTargetLang(options)}"]`);
    
    const translationResult = await page.evaluate(targetInput => {
        return targetInput.value;
    }, targetInput);

    await browser.close();
    
    return translationResult;
};

export default translate;