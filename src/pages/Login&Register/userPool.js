import { CognitoUserPool } from "amazon-cognito-identity-js";

const pooData = {
    UserPoolId: "us-east-1_Hbs3GsmNr",
    ClientId: "4f9d2q7f8d3na8uckp33lasb5r"
}

export default new CognitoUserPool(pooData);