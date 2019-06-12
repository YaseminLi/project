const path = require('path');
const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;
function resolve (dir) {
	return path.join(__dirname, dir)
};
module.exports = {
	chainWebpack: (config)=>{
            config.resolve.alias
						.set('components', resolve('src/components'))
	},
	devServer: {
		before: function(app, server) {
		  app.get('/api/seller', function(req, res) {
			res.json(seller);
		  });
		  app.get('/api/goods', function(req, res) {
			res.json(goods);
		  });
		  app.get('/api/ratings', function(req, res) {
			res.json(ratings);
		  });
		}
	  }
};
