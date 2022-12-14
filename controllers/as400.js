const appDynamics = require("appdynamics");
require('dotenv').config()
const pool = require('../database/connection');
exports.as400Production = async (req, resp) => {

let time = new Date();
let query = 'SELECT  * FROM  AS400';

  try {
    const data = await pool.query(query);

    for(let i =0; i < data.length; i++){

       nodeAppStartTransaction(

        data[i].display_name,
        data[i],
        req.url
        
        );
     
      if(i == data.length -1){
        resp.send({'date':time.toLocaleDateString(),'time':time.toLocaleTimeString(),'params.display_name':req.params.display_name,'api.url':req.url});

      }

    };
    
  } catch (error) {
    resp.send({'error':error})
    
  }

return;


};


function nodeAppStartTransaction(param, data, api) {
    var transactionInfo = api;
    var transaction_id = null;
    appDynamics.profile({
        controllerHostName: 'datasysgroup-nfr.saas.appdynamics.com',
        controllerPort: 443,

        // If SSL, be sure to enable the next line
        controllerSslEnabled: true,
        accountName: 'datasysgroup-nfr',
        accountAccessKey: 'h1n4j6ut88ei',
        applicationName: 'AS400_PRODUCTION',
        tierName: 'AS400_PRODUCTION',
        nodeName: 'process' // The controller will automatically append the node name with a unique number
    });
    var transaction = appDynamics.startTransaction(transactionInfo);
    transaction.addAnalyticsData(param, JSON.stringify(data));
    transaction.addSnapshotData(param, JSON.stringify(data));
    console.log('transaction', transaction)
    transaction_id = transaction.transaction.id;
    transaction.end();
    return transaction_id;
}


exports.as400_404 = (req, resp) => {

    resp.send('Not Found, the correct api should be ' + `${process.env.prdMode === "true" ? process.env.prdtURL : process.env.testURL}`);
};
