let PublicController = {}
let config = require('../config')

PublicController.getData = (req, res) => {
	if (req.body.cod) {
		config.sequelize.query('SELECT * from prueba p where p.cod = ?;', {replacements: [req.body.cod]}).then(function (prueba) {
      		res.status(200).json({ prueba:prueba[0] })
  		}).catch(function(error){
	    	console.log(error)
	    	res.status(500).json({ message: error })
	    })
	} else {
		res.json({mensaje: 'Revisar los parametros requeridos'})
	}
}

module.exports = PublicController