const http = require('http');
const url = require('url');

class Server {
    async handleRequest(func, req, res) {
        try {
            let result = await func(req, res);

            if (typeof result.data === 'object') {
                result.data = JSON.stringify(result.data);
                result.content = 'application/json';
            }
            result.content = result.content ?? 'text/plain';
            result.status = result.status ?? 200;

            res.writeHead(
                result.status,
                {'Content-Type': result.content}
            );
            res.end(result.data);
        } catch (error) {
            console.log('Unhandled error', error);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end();
        }
    }

    requestListener(req, res) {
        let checkRouter = (router, req) => {
            let reqUrl = url.parse(req.url, true);
            return (router.pathname === reqUrl.pathname &&
                router.method === req.method);
        }

        for (let router of this.routers.flat()) {
            if (checkRouter(router, req)) {
                req.body = '';
                req.on('data', (data) => {
                    req.body += data;
                });
                req.on('end', () => this.handleRequest(router.func, req, res));
                return;
            }
        }
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }

    constructor() {
        this.routers = [];
        this.server = http.createServer(this.requestListener.bind(this));
    }

    start(port, host, backlog) {
        this.server.listen(port, host, backlog);
    }

    appendRouter(router) {
        this.routers.push(router);
    }
}

module.exports = Server;