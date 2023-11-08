/**
 *
 * @param jsonObj convert jsonObj to xml format
 * @returns xml string
 */
const convert = (obj: any): string => {
  let xml = '';
  for (const prop in obj) {
    xml += obj[prop] instanceof Array ? '' : `<${prop}>`;
    if (obj[prop] instanceof Array) {
      for (const array in obj[prop]) {
        xml += `<${prop}>`;
        xml += convert(new Object(obj[prop][array]));
        xml += `</${prop}>`;
      }
    } else if (typeof obj[prop] === 'object') {
      xml += convert(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : `</${prop}>`;
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
};

/**
 *
 * @param jsonObj Body to add in response
 * @param header Header to add in response
 * @returns xml string
 */
const convertToXML = (jsonObj: any, header: any = {}): string => {
  let xml = `<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>`;
  xml += `${convert(header)}`;
  xml += `${convert(jsonObj)}</channel></rss>`;
  return xml;
};

export default convertToXML;
