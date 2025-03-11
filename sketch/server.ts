import express, { type Request, type Response } from 'express';
import fs from 'fs/promises';

const PORT = process.env.EXPRESS_PORT || 3000;
const SONGS_DIR = process.env.SONGS_DIR || './songs';
const ASSETS_DIR = process.env.PUBLIC_DIR || './public';

express()
  .get('/songs', async (_req: Request, res: Response) => {
    await fs.readdir(SONGS_DIR).then((files) =>
      res.json({ files })).catch((err) => {
        console.error('Error reading song files: ', err);
        res.status(500).json({ error: 'Error reading song files' });
      });
  })
  .use(express.static(ASSETS_DIR))
  .use(express.json())
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
