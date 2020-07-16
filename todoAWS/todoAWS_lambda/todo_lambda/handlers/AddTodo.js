var MongoClient = require('mongodb').MongoClient

module.exports  = (event, context, callback) => {
    var connectionString = "   "
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
        db.collection(collectionName).insertOne(event, onInsertCallCompleted)
    }

    function onInsertCallCompleted(err, result) {
        newRecord = result
        if (err != null) {
            callback(null, {status:"failed", error: message})
        }
        else {
            callback(null, {status:"success", message: "insert completed"})
        }
    }
};