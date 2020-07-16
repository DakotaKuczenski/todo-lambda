var GetTodoList = require('./handlers/GetTodoList')
var AddTodo = require('./handlers/AddTodo')
var UpdateTodo = require('./handlers/UpdateTodo')
var GetTodo = require('./handlers/GetTodo')
var DeleteTodo = require('./handlers/DeleteTodo')

exports.handler = (event, context, callback) => {
    updateEventLoopIgnore()

    return routeEvent()

    function routeEvent() {
        var action = process.env.ACTION
        var routeMap = createRouteMap()
        var route = routeMap[action]

        if (route === undefined) {
            return
        }

        return route(event, context, callback)
    }

    function updateEventLoopIgnore() {
        var ignoreEventLoop = process.env['IGNORE_EVENT_LOOP']
        if (ignoreEventLoop == "YES") {
            context.callbackWaitsForEmptyEventLoop = false;
        }
    }
    
    function createRouteMap() {
        var routeMap = {}
        routeMap["ListTodo"] = GetTodoList
        routeMap["AddTodo"] = AddTodo
        routeMap["UpdateTodo"] = UpdateTodo
        routeMap["GetTodo"] = GetTodo
        routeMap["DeleteTodo"] = DeleteTodo
        return routeMap
    }    
};