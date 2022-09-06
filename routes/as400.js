const  express =  require('express'),
router = express.Router(),
as400Controller = require('../controllers/as400');
require('dotenv').config()  
const apiURL = process.env.prdtURL;
const apiController =  as400Controller.as400Production;
console.log('process.env.prdMode',process.env.prdMode   )
console.log('process.env.apiURL',apiURL   )
router.get( apiURL,apiController )
router.use(as400Controller.as400_404)

module.exports = router