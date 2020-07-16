var MongoClient = require('mongodb').MongoClient
var GetTodo = require('./GetTodo')

module.exports  = (event, context, callback) => {
    var connectionString = " "
    var collectionName = "todo"
    var hasError = false
    var documents = []
    
    if (event.queryStringParameters != null && event.queryStringParameters.id !== undefined) {
        return GetTodo(event, context, callback)
    }
    
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
        var cursor = filterFunction(db.collection(collectionName))
        cursor.each(onProcessCursorItem)
    }

    function filterFunction(collection) {
        return collection.find({})
    }

    function onProcessCursorItem(err, document) {
        if (hasError) {
            return
        }

        if (err !== null){
            hasError = true
            
            console.log("cursor error: " + err)
            return
        }

        if (document === null) {
            sendDocuments()
            return
        }

        documents.push(document)
    }

    function sendDocuments() {
        var body = {status: "ok", items: documents}
        var bodyString = JSON.stringify(body)

        callback(null, {statusCode: "200", headers: {"Access-Control-Allow-Origin": "*"}, body: bodyString})    
    }
};