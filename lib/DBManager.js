var config = require('../config'),
mongo = require('mongodb');

DBManager = function() {
    var server = new mongo.Server(config.settings.hostname, config.settings.port, {auto_reconnect: true});
    var db = new mongo.Db(config.settings.db, server, {});
    db.addListener('error', function(err) {
        console.log('Error realated to Mongo!!!!', err);
        this.db = db;
    });
    db.open(function(err) {
        // authenticate if needed
        if (config.auth === true) {
            db.authenticate(config.settings.username, config.settings.password, function(err) {
                // only after this completes are we able to access the database
                // Potential here for a race condition.
                console.log('Database up with authentication');
            });
        }
        else {
            console.log('Database up no authentication');
        }
    });
    this.db = db;
};

DBManager.prototype.getCollectionByName = function(collection_name, callback) {
    this.db.collection(collection_name, function(err, collection) {
        if (err) console.log(err);
        else callback(null, collection);
    });
};

//Generic calls to MongoDB that can be used to insert/modify/get data to/from a MongoDB.

/* Insert Objects */
DBManager.prototype.objInsert = function(collectionName,obj,obj2, callback) {
    this.getCollectionByName(collectionName, function(err, collection) {
        if (err) {callback(err)}
        else {
            collection.save(obj, obj2,
            function(err,result) {
                if (err) callback(err);
                else if (typeof callback === 'function') {
                        callback(null, result);
                }
            });
        }
    });
};

/* Get */
DBManager.prototype.objGet = function(collectionName, obj,obj2, callback) {
    this.getCollectionByName(collectionName, function(err, collection) {
        if (err) callback(err);
        else {
            collection.findOne(obj, obj2, function(err, result) {
                if (err) callback(err);
                else if (typeof callback === 'function') {
                        callback(null, result);
                }
            });
        }
    });
};

/* Get All*/
DBManager.prototype.objGetAll = function(collectionName, obj,obj2, callback) {
    this.getCollectionByName(collectionName, function(err, collection) {
        if (err) callback(err);
        else {
            collection.find(obj, obj2).toArray(function(err, result) {
                if (err) callback(err);
                else if (typeof callback === 'function') {
                    callback(null, result);
                }
            });
        }
    });
};

exports.DBManager = DBManager;
