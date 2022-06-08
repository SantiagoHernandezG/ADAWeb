const Wordcloud = require('../models/wordclouds/wordcloud')


//Altas de descripcion para el wordcloud
exports.Wordcloud_post = async (req, res) => {
	const newWordcloud = {
		descripcion: req.body.descripcion,
		usuario: req.body.descripcion
	}
	console.log(newWordcloud)
	try {
		let wordcloud = await Wordcloud.create(newWordcloud)
		Wordcloud.find({}, async (err, wordclouds) => {
			res.render('./nosotrxs', { user: req.user, wordclouds: wordclouds, palabra: wordcloud })
		})
	} catch (err) {
		console.log(err)
	}

}



exports.nosotrxs_get = function (req, res) {
	Wordcloud.find({}, function (err, wordclouds) {
		if (err) console.log(err)
		console.log(wordclouds.length)
		//console.log(wordclouds)
		res.render('./nosotrxs', { user: req.user, wordclouds: wordclouds })
	})
}
