import {createServer} from 'http'
import 'dotenv/config'
import * as url from "url";
import queryString from 'query-string'
import * as fs from "fs";
import * as path from "path";

const contentTypes = {
	'.html': 'text/html', '.jpg': 'image/jpg'
}

const fileHandle = (filepath) => {
	fs.access(filepath, fs.constants.F_OK, (err) => {
		if (err) throw err;
	})
	return fs.readFileSync(filepath);
}

function response(req, res, filepath) {
	filepath = 'static/' + filepath;
	const fileExtension = path.extname(filepath)
	res.writeHead(200, {
		'content-type': contentTypes[fileExtension] ?? 'text/html'
	})
	const renderedFile = fileHandle(filepath)
	res.end(renderedFile)
}

const routes = {
	"GET": {
		'/': (req, res) => {
			response(req, res, 'index.html')
		}, '/contact': (req, res) => {
			response(req, res, 'Contact page')
		}, '/login': (req, res) => {
			response(req, res, 'login.html')
		}
	}, "POST": {
		'/login': (req, res) => {
			let data;
			req.on('data', (chunk) => {
				data += chunk;
			})

			req.on('end' +
				'', () => {
				console.log(queryString.parse(data, true))
			})
			response(req, res, 'Login Post page')
		}
	}, "NA": (req, res) => {
		response(req, res, '404 | not found', 404)
	}
}

const server = createServer(((req, res) => {
	const method = req.method
	const parsedUrl = url.parse(req.url, true)
	const path = parsedUrl.pathname
	const validRoute = routes[method][path] ?? false;
	if (!validRoute) {
		routes["NA"](req, res)
	} else {
		routes[method][path](req, res)
	}
}))

server.listen(process.env.PORT, () => {
	console.log('Server is running at %s://%s:%s', process.env.PROTOCOL, process.env.HOST_NAME, process.env.PORT)
})

