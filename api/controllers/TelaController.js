/**
 * TelaController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
	increment: function(req, res) {

		Tela.findOne()
			.where({ name: req.param("name") })
			.then(function(tela){
				
				var incr = ++tela.count;

				// save the updated value
  				tela.save(function(err) {
    				
  					if(err) {

  						res.json({
  							result: "error",
  							exception: err
  						});
  					}

  					else  {

  						res.json({
  							result: "success",
  							name: req.param("name"),
  							count: incr
  						})
  					}
  				});
  			});
	},

	ranking: function(req, res) {

		Tela.find()
			.limit(req.param("limit") || 5)
			.sort({count: -1})
			.exec(function(err, docs) {

				if(err) {

					res.json({
						result: "error",
						exception: err
					});

					return;
				}

				res.json({
					result: "success",
					ranking: docs
				})
			})
		}
};
