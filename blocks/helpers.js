/**
 * Fetches the dictionary from /api/dictionary.json and scopes the result by current language.
 * The dictionary must be created as an excel sheet located at /api/dictionary.xlsx
 * The Dictionary has a format of:
 * | key | en-us | de-de | fr-fr | ...
 * | blogpost.backtotop | Back to top | Nach oben | Retour en haut | ...
 *
 * Entries then can be accessed by key, e.g. dictionary.blogpost.backtotop
 * @type {Promise<any> | null}
 */
let dictionaryPromise = null;
export async function getDictionary() {
  const lang = document.documentElement.lang.toLowerCase() || 'en-us';
  if (dictionaryPromise === null) {
    dictionaryPromise = fetch(`/api/dictionary.json`)
      .then((res) => res.json())
      .catch((e) => console.error('Failed to fetch dictionary', e));
  }

  /** @type Array<{ key:string} & Record<string, string>> */
  const dictionary = (await dictionaryPromise).data;
  const dictionaryLangValues = dictionary.filter((item) =>
    Object.keys(item).includes(lang)
  );
  const dictionaryLang = dictionaryLangValues.map((item) => {
    const key = item.key;
    const value = item[lang];
    return [key, value];
  });

  // key is e.g. blogpost.backtotop and value is 'Back to top'. We are creatating a
  // new object split by '.' and creating nested objects.
  const dictionaryLangNested = dictionaryLang.reduce(
    (/** @type {Record<string, any>} */ acc, [key, value]) => {
      const keys = key.split('.');
      const last = keys.pop();
      if (!last) {
        return acc;
      }
      let obj = acc;
      for (const k of keys) {
        if (!(k in obj)) {
          obj[k] = {};
        }
        obj = obj[k];
      }
      obj[last] = value;
      return acc;
    },
    {}
  );
  return dictionaryLangNested;
}
