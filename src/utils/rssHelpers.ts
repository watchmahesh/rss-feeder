/**
 * Map an array to RSS format.
 *
 * @param res JSON array to map to RSS format
 * @returns RSS-formatted array
 */
export function mapArrayToRssFormat(res: any): any {
  return Object.values(res).map((item: any) => {
    let body = removeTags(item.fields.body, 'iframe');
    body = removeTags(body, 'figcaption');

    return {
      title: item.fields.headline,
      description: `<![CDATA[${body}]]>`,
      link: item.webUrl,
      pubDate: transformRssPubDay(new Date(item.webPublicationDate)),
    };
  });
}

/**
 * Generates RSS time format.
 *
 * @param date Timestamp or JS time for parsing
 * @returns RSS-formatted time
 */
export function transformRssPubDay(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ];

  const day = days[date.getDay()];

  // RSS format: Day, Date Month Year H:m:s TimeZone
  return `${day}, ${date.toISOString().substr(5, 2)} ${monthName[date.getMonth()]} ${
    date.getFullYear()
  } ${date.toISOString().substr(11, 8)} UTC`;
}

/**
 * Remove specified tag from a string.
 *
 * @param string HTML string
 * @param tag Tag name to remove from the string
 * @returns String with tags removed
 */
export function removeTags(string: string, tag: string): string {
  let find = true;
  while (find) {
    const startIframe = string.indexOf(`<${tag}`);
    if (startIframe === -1) {
      find = false;
      continue;
    }
    const endIframe = string.indexOf(`</${tag}>`);
    string = string.substring(0, startIframe) + string.substring(endIframe + tag.length + 4);
  }
  return string;
}
