'use stricts';
import http from 'http';

class Server {
    generateRoutes() {
        return {
            '/healthy': (req, resp) => {
                resp.writeHead(200);
                resp.write('Ok');
                resp.end();
            },
            default: (req, resp) => {
                resp.writeHead(404, 'Not found!');
                resp.end();
            }
        };
    }

    handler(req, resp) {
        const { url } = req;
        const routes = this.generateRoutes();
        const chosen = routes[url.toLocaleLowerCase()] ?? routes.default;
        chosen(req, resp)
    }

    initialize() {
        http.createServer(this.handler.bind(this)).listen(3000);
    }
}

new Server().initialize();