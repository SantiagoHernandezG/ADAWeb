const Wordcloud = require('../models/wordclouds/wordcloud')


//Altas de descripcion para el wordcloud
exports.Wordcloud_post =  function (req, res) {
	Wordcloud.find({}, function (err, wordclouds) {
	const newWordcloud = {
		descripcion: req.body.descripcion,
		usuario: req.body.descripcion	
	}
	console.log(newWordcloud)
    try{
        let wordcloud = Wordcloud.create(newWordcloud)
        done(null, wordcloud)
    } catch (err){
        console.log(err)
    }
	res.render('./nosotrxs',  { user: req.user, wordclouds: wordclouds})
})
}


exports.nosotrxs_get = function (req, res) {
	Wordcloud.find({}, function (err, wordclouds) {
        if (err) console.log(err)
        console.log(wordclouds.length)
		//console.log(wordclouds)
        res.render('./nosotrxs',  { user: req.user, wordclouds: wordclouds})
    })
}
