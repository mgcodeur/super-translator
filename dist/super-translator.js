import m from "https";
class a {
  static async translate({ from: t = "auto", to: r = "en", text: e }) {
    const n = await a.requestTranslation(t, r, e);
    return a.getSentenceFromJSON(n);
  }
  static async requestTranslation(t, r, e) {
    if (e.length > 5e3)
      throw new Error("Maximum number of characters exceeded: 5000");
    const n = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURI(t)}&tl=${encodeURI(r)}&dt=t&q=${encodeURI(e)}`, l = await new Promise((u, d) => {
      m.get(n, (s) => {
        let c = "";
        s.on("data", (o) => c += o), s.on("end", () => u(c)), s.on("error", (o) => d(o));
      });
    });
    return JSON.parse(l);
  }
  static getSentenceFromJSON(t) {
    if (!Array.isArray(t) || !Array.isArray(t[0]) || !Array.isArray(t[0][0]))
      throw new Error("Invalid JSON response");
    return t[0][0][0];
  }
}
const y = ({ from: i = "auto", to: t = "en", text: r }) => a.translate({ from: i, to: t, text: r });
export {
  y as default
};
