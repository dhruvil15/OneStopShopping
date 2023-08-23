export const handler = async (event) => {

    /**
     * About solving the CORS error, Referred from: https://docs.datomic.com/cloud/tech-notes/cors-lambda-proxy.html
     * Author: Datomic.com
     */
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
    };

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify("CORS Preflight Request Handled"),
        };
    }

    /***************** */

    const cartItems = JSON.parse(event.body).cartItems;
    const products = JSON.parse(event.body).products;

    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = products.find((product) => product.id === Number(item));
            totalAmount += cartItems[item] * itemInfo.price;
        }
    }

    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({ totalAmount }),
    };
};
