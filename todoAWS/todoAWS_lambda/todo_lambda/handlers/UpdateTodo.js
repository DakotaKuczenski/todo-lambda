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
        var _id = ObjectId(event._id)

        var todo = {}
        todo.name = event.name
        todo.description = event.description

        db.collection(collectionName).findOneAndUpdate({_id: _id}, {$set: todo}, onUpdateCallCompleted)
    }

    function onUpdateCallCompleted(err, result) {
        newRecord = result
        if (err != null) {
            callback(null, {status:"failed", error: message})
        }
        else {
            console.log(result)
            callback(null, {status:"success", message: "update completed"})
        }
    }
};