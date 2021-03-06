const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const tableName = process.env.tableName;

exports.handler = async(event) =>{
    console.log("🚀 ~ file: disconnect.js ~ line 7 ~ exports.handler=async ~ event", event)
    const {connectionId: connectionID} = event.requestContext;
    await Dynamo.delete(connectionID,tableName);

    return Responses._200({message:"disconnected"});
};