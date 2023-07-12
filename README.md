## Installation
1. Run `npm i @mgcodeur/super-translator` or `yarn add @mgcodeur/super-translator` or `pnpm add @mgcodeur/super-translator`

## Usage
```js
import translate from '@mgcodeur/super-translator';

const translated = await translate('Hello world', {
    translateFrom: 'en',
    translateTo: 'es'
});

// output: Hola mundo
```

## Auto detect language

```js
import translate from '@mgcodeur/super-translator';

// translateFrom is optional, if not specified, it will be auto detected
const translated = await translate('Hello world', {
    translateTo: 'ja'
});

// output: こんにちは世界
```

### Note: if translateTo is not specified, it will be "en"