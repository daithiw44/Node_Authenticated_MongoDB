Authenticating against a MongoDB server using christkv / node-mongodb-native driver for NodeJS for Cloud Foundry / MongoLabs etc..

This is just a basic example that demonstartes how to make the call to authenticate against a MongoDB server and what to look out for.

In this example the config.js is pointing to Cloud Foundry or MongoLab / localhost etc. Apart from Cloud Foundry most all other mongo servers will be the same.

The app.js has an input page which, for the purposes of the example, takes a string from the querystring and inserts this value into the database. (Obviously just an example)
So by going to http://localhost:3000/input/testvalue the string 'testvalue' would be inserted into the database.
The button on the page when clicked makes a post request to get the values stored in the database, these values can been seen in chrome developer tools or firebug... they are not written to the DOM.

What this example looks at is -
a) How to authenicate against a MongoDB server using node
	<br/>
	db.open(function(err) {<br/>
		 db.authenticate(config.settings.username, config.settings.password, function(err) {<br/>
				//Inside here this callback will, if error free mean authenication has happened.<br/>
				//This is the most place you can experience a race condition and attempt to interact with the database before the authentication process has completed</br>
		 });<br/>
		 ....
		 <br/>
	
b) Authenictaing against a MongoDB server can take time. So after we open and authenicate against our MongoDB server 
we can continue to create our nodejs server but our database won't be available until the authenication call returns. 
Which could leave you with a race condition where you are trying to read or write to a database that hasn't 
returned authenticated yet.



