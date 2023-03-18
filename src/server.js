'use stricts';
import http from 'http';
import urlParser from 'url';
import CpfService from './service/cpfService.js';
import CnpjService from './service/cnpjService.js';

class Server {
    #cpfService = new CpfService();
    #cnpjService = new CnpjService();

    generateRoutes() {
        return {
            '/healthy': (req, resp) => {
                resp.writeHead(200);
                resp.write('Ok');
                resp.end();
            },
            '/cpf': (req, resp, queryParam) => {
                resp.writeHead(200);
                const cpf = this.#cpfService.generate(queryParam.get('isFormated'));
                resp.write(cpf);
                resp.end();
            },
            '/cpf/valid': (req, resp, queryParam) => {
                resp.writeHead(200);
                const isValid = this.#cpfService.valid(queryParam.get('cpf'));
                resp.write(JSON.stringify(isValid));
                resp.end();
            },
            '/cnpj': (req, resp, queryParam) => {
                resp.writeHead(200);
                const cnpj = this.#cnpjService.generate(queryParam.get('isFormated'));
                resp.write(cnpj);
                resp.end();
            },
            '/cnpj/valid': (req, resp, queryParam) => {
                resp.writeHead(200);
                const isValid = this.#cnpjService.valid(queryParam.get('cnpj'));
                resp.write(JSON.stringify(isValid));
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
        const urlFormated = url.split('?')[0].toLocaleLowerCase();
        const chosen = routes[urlFormated] ?? routes.default;
        const queryParams = this.getQueryParams(url);
        chosen(req, resp, queryParams);
    }

    getQueryParams(url) {
        const queries = urlParser.parse(url, true).query;
        const queryParams = new Map();

        for (const key of Reflect.ownKeys(queries)) {
            let value = Reflect.get(queries, key);
            if (value === 'true' || value === 'false')
                value = value === 'true';
            
            queryParams.set(key, value);
        }

        return queryParams;
    }

    initialize() {
        http.createServer(this.handler.bind(this)).listen(3000);
    }
}

new Server().initialize();