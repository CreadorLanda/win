import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from 'http';
import app from '../src/app';
import { initIO } from '../src/libs/socket';

// Create HTTP server and initialize Socket.IO
const server = createServer(app);
initIO(server);

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}

