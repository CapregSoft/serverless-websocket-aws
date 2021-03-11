const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const WebSocket = require("../common/websocketMessage");
const tableName = process.env.tableName;

exports.handler = async (event) =>{
    console.log("🚀 ~ file: message.js ~ line 12 ~ exports.handler= ~ event", event)
    const {connectionId:connectionID} = event.requestContext; // was typo here RequestContext
    const body = event.body;

    try{
        const record = await Dynamo.get(connectionID,tableName);
        const {messages,domainName,stage} = record;
        messages.push(body);
        const data = {
            ...record,
            messages
        };
        await Dynamo.write(data,tableName);
        // this part is for replying back
        await WebSocket.send({
            domainName,
            stage,
            connectionID,
            message:"This is a reply message from the websocket"
        });
        console.log('message sent');
        return Responses._200({message:'got a message'});
    }catch(err){
        return Responses._400({message:"Couldn't receive a message"});
    }
}