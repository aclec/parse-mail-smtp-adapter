# parse-mail-adapter-smtp-ejs
Parse Server Mail Adapter for basic SMTP

### Installation

Install npm module in your parse server project

```sh
$ npm install --save parse-smtp-adapter
$ yarn add parse-smtp-adapter
```

### Use


```js
"use strict";

const Express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = Express();
const APP_PORT = 8080;


let api = new ParseServer({
    appName: "Parse Test",
    appId: "appid",
    masterKey: "secret",
    serverURL: "http://localhost:8080/parse",
    publicServerURL: "http://localhost:8080/parse",
    databaseURI: "mongodb://user:pass@host:27017/parse",
    port: APP_PORT,
    //This is the config for email adapter
    emailAdapter: {
        module: "parse-smtp-adapter",
        options: {

            nodeMailerOptions: {
                host: 'your.smtp.host',
                port: 465,
                secure: true, //True or false if you are using ssl 
                auth: {
                    user: 'email@email.com',
                    pass: 'AwesomePassword',
                }
                // you can add here other custom props for nodemailer like "tls"...
            },

            defaultFrom: 'noreply@sender.address', // Use for ResetPassword, VerifyEmail            
        }
    }
});


app.use('/parse', api);

app.listen(APP_PORT, function () {
	console.log(`Parse Server Ready and listening on port ${APP_PORT}`);
});
```

#### Variables (resetPassword & verifyMail)
- appName //This is the name of your parse app
- link //This is the link for reset the password
- user //This is a Parse object of the current user


### Send Mail From Cloud Code

```js
Parse.Cloud.sendEmail({
    from: "your@sender.address",
    to: "user@email.address",
    subject: "my Subejct",
    html: "",
    text: "", // Email Text
    data: {} // data gives to ejs
});
```


### License MIT
