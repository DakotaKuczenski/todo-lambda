var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

module.exports  = (event, context, callback) => {
    var connectionString = " "
    var collectionName = "todo"
    var hasError = false
    var documents = []
    
    connect(connectionString)

    
    function connect(connectionString) {
        MongoClient.connect(connectionString, onConnectedCallCompleted)    
    }

    function onConnectedCallCompleted(err, db) {
        if (err != null) {
            console.log(err)            
            return
        }
        
        onConnected(db)
    }

    function onConnected(db) {
        var _id = ObjectId(event["queryStringParameters"]['id'])
        db.collection(collectionName).deleteOne({_id: _id}, onDeleteCallCompleted)
    }

    function onDeleteCallCompleted(err, result) {
        if (err != null) {
            console.log("error:" + err)
            callback(null, {status:"failed", error: err})
        }
        else {
            callback(null, {statusCode: "200",  headers: {"Access-Control-Allow-Origin": "*"}})
        }
    }
};