// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https")
// const app = express();
//
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// // make css and image public we use app.use
// app.use(express.static("public"))
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/signup.html");
// })
// async function add(member){
//   const response = await client.lists.addListMember("8875b4be0c", member)
// }
//
// app.post("/", function(req, res) {
//   const firstName = req.body.fname;
//   const lastName = req.body.lname;
//   const email = req.body.email;
//   const data = {
//     members: [{
//       email_address: email,
//       status: "subscrbed",
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName
//       }
//     }]
//   };
//   const jsonData = JSON.stringify(data);
//   const url = "https://us21.api.mailchimp.com/3.0/lists/members";
//   const options = {
//     methods: "POST",
//     auth:"pulkit:4019d8adb2980bb2bb77638c4a7d15f9-us21"
//   }
//   const request = https.request(url, options, function(response)
//   {
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     })
//   })
// request.write(jsonData);
// request.end();
//
// });

// api key
// 4019d8adb2980bb2bb77638c4a7d15f9-us21
// audienceid
// 8875b4be0c.


// app.listen(3600, function() {
//   console.log("server is running on port 3000")
// })


// const express = require("express");
// const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");
//
//
// const app = express();
//
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/signup.html");
// })
//
//
//
// app.post("/", function(req, res) {
//   const mail = req.body.email;
//   const fName = req.body.fName;
//   const lName = req.body.lName;
//
//   const newMember = {
//
//       FNAME: fName,
//       LNAME: lName,
//       email_address: mail,
//
//   };
//
//   client.setConfig({
//     apiKey: "4019d8adb2980bb2bb77638c4a7d15f9-us21",
//     server: "us21",
//   });
//
//
//   async function run() {
//     //"Try" this function and if successful do the following
//     try {
//       const response = await client.lists.addListMember("8875b4be0c", {
//         email_address: newMember.email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: newMember.firstName,
//           LNAME: newMember.lastName
//         }
//       });
//       console.log(`${response.merge_fields.FNAME} ${response.merge_fields.LNAME} with email ${response.email_address} has been successfully registered`);
//       res.sendFile(__dirname + "/success.html")
//     }
//     // If the 'Try' function isn't successful, do this on failure.
//     catch (err) {
//       //This is will return the error code
//       console.log(err.status)
//       res.sendFile(__dirname + "/failure.html")
//     }
//   }
//   run();
// })
//
// app.listen(3600, function() {
//   console.log("Your Server is Running on Port 3000");
// })








const express = require ('express');
const bodyParser = require ('body-parser');
//const request = require('request'); Didn't need to use this

const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
//This lets us server static assets like javascript or css
app.use(express.static("public"));

//This line makes it easier to parse the the request by placing the information in the request body.
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    let fn = req.body.firstName
    let ls = req.body.lastName
    let email = req.body.email

    //Object Prepared for Mailchimp
    const subscribingUser = {
      firstName: fn,
      lastName: ls,
      email: email,
    };


    //Mailchimp API Paramenters
    mailchimp.setConfig({
      apiKey: "4019d8adb2980bb2bb77638c4a7d15f9-us21",
      server: "us21",
    });

    const listId = "8875b4be0c";

    //Mailchimp API POST New Subscriber Function
    async function run() {
      //"Try" this function and if successful do the following
      try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }
        });

        //My Custom Response. You can log anything you want, like just the whole 'response' too
        console.log(`${response.merge_fields.FNAME} ${response.merge_fields.LNAME} with email ${response.email_address} has been successfully registered`);

        res.sendFile(__dirname + "/success.html")
      }
      // If the 'Try' function isn't successful, do this on failure.
      catch (err) {
        //This is will return the error code
        console.log(err.status)
        res.sendFile(__dirname + "/failure.html")
      }
    }
    run();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(3600,function() {
    console.log("Listening on port 3000;");
})
