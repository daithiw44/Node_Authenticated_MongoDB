var settings;
if(process.env.VCAP_SERVICES){
	//This is cloud foundry authentication method
	var env = JSON.parse(process.env.VCAP_SERVICES);
	console.log('auth: ',env['mongodb-1.8'][0]['credentials']);
	settings = env['mongodb-1.8'][0]['credentials'];
}
else{
	//This is for  eg. a mongo server hosted locally or @ MongoLab etc
	settings = {
	  hostname: "????.mongolab.com",//or 0.0.0.0,
	  host:"???.mongolab.com", //or 0.0.0.0
	  port : 27???,  //or  27017
	  name: "???", 
	  db:"???",
	  username : "???",
	  password : "???"
	};
}

exports.settings = settings;

//This can be true or false depending wether you want to authenticate against a db.
exports.auth = true;
