import { Request, Response } from 'express';
import RSSService from '../services/rssServices';
import convertToXML from '../transformer/xmlTransformer';
import { mapArrayToRssFormat } from '../utils/rssHelpers';
import { RSSFeed} from '../interface/rssInterface';

export const getRSSFeed = async (req: Request, res: Response) => {
  const section = req.params.section;
  const { page } = req.query;
  const pageNo = parseInt(page as string, 10) || 1;
  try {
    const data = await RSSService.search({
      section,
      page: pageNo.toString(),
    });
    let rssDataType: RSSFeed = {
      header: {
        title: `${section.toUpperCase()} | The Guardian`,
        description: section,
        link: process.env.RSS_FEED_HOME_URL,
        home_page_url: process.env.RSS_FEED_HOME_URL,
        feed_url: `${process.env.RSS_FEED_BASE_URL}/${section}?page=${pageNo}`,
        status: data.response.status,
        userTier: data.response.userTier,
        total: data.response.total,
      },
      item: mapArrayToRssFormat(data.response.results),
    };

    const xml = convertToXML({ item: rssDataType.item }, rssDataType.header);

    return res.status(200).set('Content-Type', 'text/xml').send(xml);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
