# serverless-websocket-aws
npm i -g serverless-offline
sls offline 
wscat -c ws://localhost:3001/message -x '{ "action": "message", "message": "This is a new message" }' -w 2
