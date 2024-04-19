// import { createServer, proxy } from "aws-serverless-express";
// import { APIGatewayProxyEvent, Context } from "aws-lambda";
// import app from "./app";

// // Create a server from your Express app
// const server = createServer(app);

// // Export the handler function for AWS Lambda
// function handler(event: APIGatewayProxyEvent, context: Context) {
//   // Use the aws-serverless-express proxy function to handle the event
//   return proxy(server, event, context);
// }

// export { handler };

async function handler(event: any, context: any) {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello 2!!!"),
  };
}
export { handler };
