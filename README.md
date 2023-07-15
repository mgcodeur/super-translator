## Installation
1. Install the package
```bash
npm i @mgcodeur/super-translator@latest
```

1. Import the module
```js
import translate from '@mgcodeur/super-translator';
```

## Basic Usage
```js
import translate from '@mgcodeur/super-translator';

const result = await translate({
    from: 'en',
    to: 'es',
    text: 'Hello World!'
});

console.log(result);
// output: Hola mundo
```

## Auto detect language
#### Nb: "from" is not required, if not specified, it will be automatically detected

**Example:**

```js
import translate from '@mgcodeur/super-translator';

const result = await translate({
    to: 'ja',
    text: 'Hello World!'
});

console.log(result);
// output: こんにちは世界
```

### Note: if "to" is not specified, it will be "en"
#### Don't forget to add type="module" in your package.json file

```json
{
  "type": "module"
  ...
}
```

**You can run this with command:**
```bash
node your-file.js
```