import translate from "./src/google-translate.js";

const response = await translate("Bonjour, je m'appelle John Doe", {
    translateFrom: "fr", // default: auto if not provided
    translateTo: "mg", // default: en if not provided
});

console.log(response);