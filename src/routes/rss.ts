import express from 'express';
import validUrlType from '../middleware/routeValidator'; // Import the validUrlType middleware

const router = express.Router();
import { getRSSFeed } from '../controller/rssController'
//route for rss search
router.get('/:section', validUrlType, getRSSFeed);


export default router;
