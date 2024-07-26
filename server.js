const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const api_key = '4c9a496cb46106cfdc3f7ac82dfb15fe-0f1db83d-4218afc8';
const domain = 'sandbox7f199e758eda4baaaaf2bf262bfff736.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: domain});

app.get('/', (request, response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.post('/', (request, response)=>{
    const email = request.body.email;
    const data = {
        from: 'Jesse <jessehickman95@gmail.com>',
        to: email,
        subject: 'Welcome to Daily Insider!',
        text: 'Welcome to our newest Daily Insider subscriber!'
    };
     
    mg.messages().send(data, function (error, body) {
        if(error){
            console.log(error);
        } else {
            console.log(body);
        }
    });
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})
