import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {

  return {
    statusCode: 200,
    body: JSON.stringify('testing testing 123'),
  };
}
