## Installation
1. Install the package
```bash
npm i @mgcodeur/super-translator
```

1. Import the module
```js
import translate from '@mgcodeur/super-translator';
```

## Basic Usage
```js
import translate from '@mgcodeur/super-translator';

const translated = await translate('Hello world', {
    translateFrom: 'en',
    translateTo: 'es'
});

console.log(translated)
// output: Hola mundo
```

## Auto detect language
#### Nb: translateFrom is not required, if not specified, it will be automatically detected

**Example:**

```js
import translate from '@mgcodeur/super-translator';

const translated = await translate('Hello world', {
    translateTo: 'ja'
});

console.log(translated)
// output: こんにちは世界
```

### Note: if translateTo is not specified, it will be "en"
### Don't forget to add type="module" in your package.json file

```json
{
  "type": "module"
  ...
}
```