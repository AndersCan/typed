import type { Server } from 'http';
import { createServer } from 'http';
import { getHtmlFile } from './get-html-file';

export function startTestServer() {
  return new Promise<[string, Server]>(resolve => {
    const htmlPromise = getHtmlFile('./**/*.spec.ts');
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      htmlPromise.then(html => res.end(html));
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
      resolve([`http://${hostname}:${port}/`, server]);
    });
  });
}