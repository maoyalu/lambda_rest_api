1. Install the serverless framework

   ```bash
   npm install -g serverless
   ```

   

2. Configure AWS IAM keys

   Replace [Access key ID] and [Secret access key] with your IAM credentials. If you don't have it, create one in the AWS console, My Security Credentials.

   ```bash
   serverless config credentials --provider aws --key [Access key ID] --secret [Secret access key]
   ```



3. Generate a boilerplate

   ```bash
   serverless create --template aws-nodejs --path [folder]
   ```

   Then it will create a boilerplate using the template for Node.js. Go into the root folder, and install the required packages.

   ```bash
   cd [folder]
   npm init -y && npm install
   ```

   And also install `express` and `serverless-http` with the command below:

   ```bash
   npm install express serverless-http
   ```

   

3. Expose an HTTP endpoint

   In the `serverless.yml` file, comment out and change the following code:

   ```yml
   functions:
   	app:
   		handler: app.server
           events:
               - http:
                   path: /
                   method: get
                   cors: true
   ```



5. Set up Express

   Delete `handler.js` file, and create one named `app.js`:

   ```javascript
   const express = require('express');
   const app = express();
   const sls = require('serverless-http');
   
   app.get('/', async (req, res, next) => {
       res.status(200).send('It\'s working')
   });
   
   module.exports.server = sls(app);
   ```

   Noticed that, AWS Lambda does not support the ES6 `import` specifier (at the time of 10/10/2019). `import express from 'express'` will cause an internal server error. And in the log we can see that it says `"Runtime.UserCodeSyntaxError: SyntaxError: Unexpected identifier"`



6. Deploy

```bash
serverless deploy
```



7. Test the API

   In the output, we can see that it exposes an endpoint probably like this.

   ```bash
   endpoints:
   	GET - https://xxxx.execute-api.xx-xxxx-x.amazonaws.com/xxx/
   ```

   Let's try it with the command below:

   ```bash
   curl https://xxxx.execute-api.xx-xxxx-x.amazonaws.com/xxx/
   ```

   And we will get our message back, "It's working".