const express = require('express');
const app = express();
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');

const FREE_SUGAR_PERSON_TABLE = process.env.FREE_SUGAR_PERSON_TABLE;

const dynamoDb = new aws.DynamoDB.DocumentClient();

app.use(bodyParser.json({strict: false}));

app.get('/table2', (req, res) => {
    const params = {
        TableName: FREE_SUGAR_PERSON_TABLE,
    };

    const onScan = (err, data) => {
        if(err){
            console.log(`Scan failed: ${err}`);
            res.status(400).json({error: err});
        }

        res.status(200).json(data.Items)
    };

    dynamoDb.scan(params, onScan);
});

// Handle the GET endpoint
app.get('/', async (req, res, next) => {
    res.status(200).send('\nIt\s working')
});

module.exports.server = sls(app);