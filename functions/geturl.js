import { ddbDocClient } from "../libs/ddbDocClient.js";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {
    // get code from url path
    const code = parseInt(event.pathParameters.param);
    // then use the code to retrieve the original url from ddb
    const getParams = {
        TableName: process.env.DYNAMODB_URLSHORTNER_TABLE,
        Key: {
            primary_key: code
        }
    };
    
    try {
        const data = await ddbDocClient.send(new GetCommand(getParams));
        return {
            statusCode: 200,
            body: data.Item.originalUrl
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: 'There was an error processing your request.'
        }
    }
};
