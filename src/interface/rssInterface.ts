export interface RSSHeader {
    title: string;
    description: string;
    link?: string;
    home_page_url?: string;
    feed_url: string;
    status: string;
    userTier: string;
    total: number;
  }

   export interface RSSFeed {
    header: RSSHeader;
    item: any[]; // Update with the actual type of item
  }
