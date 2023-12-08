const exp = require("express");
const bodyparser = require("body-parser");
// const request= require("request");
const https = require("https");

const app = exp();
app.use(exp.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const jsondata = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/f5155df57a"

    const option = {
        method: "POST",
        auth: "nayan:${process.env.NODE_APP_API_KEY}"
    }

    const request = https.request(url, option, function (response) {
       
        if(response.statusCode===200){
            res.sendFile(__dirname +"/success.html");
        }
        else{
            res.sendFile(__dirname +"/failure.html")
        }
       
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();
})

app.post("/failure", function(req,res){
res.redirect("/");
})
app.listen(process.env.POST || 6969, function () {
    console.log("hello its now double");
})


// apikey
// 4316d33ec155c68f6d33d2e65c5254dd-us8

// audienceid
// f5155df57a

