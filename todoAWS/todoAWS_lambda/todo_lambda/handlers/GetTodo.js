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
        db.collection(collectionName).findOne({_id: _id}, onFindCallCompleted)
    }

    function onFindCallCompleted(err, result) {
        var newRecord = result
        var body = {}
        if (err != null) {

            callback(null, {statusCode: "500", headers: {"Access-Control-Allow-Origin": "*"}})
        }
        else {
            var body = {status: "ok", items: [newRecord]}
            var bodyString = JSON.stringify(body)
            console.log(result)
            callback(null, {statusCode: "200", headers: {"Access-Control-Allow-Origin": "*"}, body: bodyString})    
        }
    }
};