const { outputFile } = require('fs-promise')
const nunjucks = require('nunjucks')
const debug = require('debug')('tetrys:build:html')

const environment = nunjucks.configure('./src/markup', { watch: true })

/**
 * Renders the HTML views via nunjucks.
 * @param {String} path
 * @return {Promise}
 */
function renderHTML (path = '') {
	return new Promise((resolve, reject) => {
		environment.render(path, (error, response) => {
			if (error) reject(error)
			resolve(response)
		})
	})
}

module.exports = () => {
	debug('build html files')
	return renderHTML('./index.html')
		.then(file => outputFile('./dist/index.html', file, 'utf8'))
		.catch(debug)
}
