const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')


// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

const verifiacation = "pages/b1d4cc41-a3fb-47a0-a224-078d90cd7932";
const endSession = "pages/END_SESSION";

const jsonResponses = {
    fulfillment_response: { messages: [{ text: { text: [] } }] }, // fulfillment Message
    target_page: "", // target page
    session_info: { session: "", parameters: {} }, // session info and parameters
};

app.get("/", express.json(), function (req, res) {
    const jsonRes = { message: "Hello" };
    res.status(200).send(jsonRes);
});

app.post("/uploadFile", express.json(), function (req, res) {
    console.log("inside uploadFile")
    const jsonResponse = JSON.parse(JSON.stringify(jsonResponses)); // clone the response structure
    const page = req.body.pageInfo.currentPage.search("pages/");

    // jsonResponse.target_page = req.body.pageInfo.currentPage.substr(0, page) + verifiacation;
    jsonResponse.fulfillment_response.messages[0].text.text = ["I am from upload_page."];

    res.status(200).send(jsonResponse);
});


app.post("/verify", express.json(), function (req, res) {
    console.log("inside verify")
    const jsonResponse = JSON.parse(JSON.stringify(jsonResponses)); // clone the response structure
    const page = req.body.pageInfo.currentPage.search("pages/");

    jsonResponse.fulfillment_response.messages[0].text.text = ["Helloooo from Verification Page"];
    // const flag = true;
    // if (flag) {
    //     jsonResponse.target_page = req.body.pageInfo.currentPage.substr(0, page) + endSession;
    //     jsonResponse.fulfillment_response.messages[0].text.text = ["Helloooo from Page 2"];
    // } else {
    //     // jsonResponse.target_page = req.body.pageInfo.currentPage.substr(0, page) + verifiacation;
    //     jsonResponse.fulfillment_response.messages[0].text.text = ["Helloooo from Verification Page"];
    // }
    res.status(200).send(jsonResponse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})