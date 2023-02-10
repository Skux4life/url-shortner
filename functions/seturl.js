import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export const handler = async (event) => {
    if (event.body != null && event.body != undefined) {
        const body = JSON.parse(event.body);
        let url;
        if (body.url) {
            url = body.url;
        }
        const code = Math.floor(Math.random()*90000) + 10000;
        const putParams = {
            TableName: process.env.DYNAMODB_URLSHORTNER_TABLE,
            Item: {
                primary_key: code,
                originalUrl: url
            },
        };
        try {
            const data = await ddbDocClient.send(new PutCommand(putParams));
            return {
                statusCode: 201,
                body: process.env.API_URL + '/get/' + code
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: 'There was an error processing your request.'
            }
        }
    } else {
        return {
            statusCode: 400,
        }
    }
};
