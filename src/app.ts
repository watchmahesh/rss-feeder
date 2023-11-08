import express from 'express';
import rssRouter from './routes/rss';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3300;
app.get('/', (req, res) => res.status(200).json({ success: 'Rss feed' }));
app.use('/rss', rssRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
