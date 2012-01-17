Authenticating against a MongoDB server using christkv / node-mongodb-native driver for NodeJS.

This is just a basic example that demonstartes how to make the call to authenticate against a MongoDB server and what to look out for.

The app.js has an input page which, for the purposes of the example, takes a string from the querystring and inserts this value into the database. (Obviously just an example)
So by going to http://localhost:3000/input/testvalue the string 'testvalue' would be inserted into the database.
The button on the page when clicked makes a post request to get the values stored in the database, these values can been seen in chrome developer tools or firebug... they are not written to the DOM.

What this exmample looks at is -
a) How to authenicate against a MongoDB server using node
	db.open(function(err) {
		 db.authenticate(config.settings.username, config.settings.password, function(err) {
				//Inside here this callback will, if error free mean authenication has happened.
		 });
	
b) Authenictaing against a MongoDB server can take time. So after we open and authenicate against our MongoDB server we can continue to create our nodejs server but our database won't be available until the authenication call returns. Which could leave you with a nasty race condition where you are trying to read or write to a database that hasn't returned authenticated yet.

What I'm not attempting to do here is tell you how to handle this delay in authentication. There are a number of options/things to consider including... just leaving your site sart up and letting the database authenticated when it gets to it. Problem here is if you are running somethiong like sparks 2 or forever where your server will just start up itself if it crashes for whatever reason.. or perhaps putting part of the routing of your site in a callback thats executed after authentication.
