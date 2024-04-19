async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello 2!!!"),
  };
}
export { handler };
