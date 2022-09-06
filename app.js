require("appdynamics").profile({
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
const express =   require('express'),
      app     =   express();
      require('dotenv').config()    
app.use('/',require('./routes/as400'))

      const PORT  = process.env.PORT || 3000
      app.listen(PORT, () =>{
        console.log('Listening on Port: '+`${PORT || 4000}` );
      })