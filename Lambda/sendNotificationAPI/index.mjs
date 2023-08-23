import AWS from "aws-sdk";

export const handler = async (event) => {
  const sns = new AWS.SNS({ region: "us-east-1" });
  const topicArn = "arn:aws:sns:us-east-1:140800420738:addToCartNotification";

  /**
 * About solving the CORS error, Referred from: https://docs.datomic.com/cloud/tech-notes/cors-lambda-proxy.html
 * Author: Datomic.com
 */
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify("CORS Preflight Request Handled"),
    };
  }
  /**************** */

  try {
    const { productName } = JSON.parse(event.body);
    const message = `Item "${productName}" has been added to your cart.`;

    const params = {
      TopicArn: topicArn,
      Message: message,
    };

    await sns.publish(params).promise();

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "SNS message sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending SNS message:", error);

    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: "Failed to send SNS message" }),
    };
  }
};
