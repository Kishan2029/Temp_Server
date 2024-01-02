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

const page1 = "pages/98fcd5ff-5f32-4e5b-b6f8-2ef25620b1b7";
const page2 = "pages/END_SESSION"
const jsonResponses = {
    fulfillment_response: { messages: [{ text: { text: [] } }] }, // fulfillment Message
    target_page: "", // target page
    session_info: { session: "", parameters: {} }, // session info and parameters
};

app.get("/", express.json(), function (req, res) {
    const jsonRes = { message: "Hello" };
    res.status(200).send(jsonRes);
});

app.get("/webhook", express.json(), function (req, res) {
    console.log("inside webhook")
    const jsonRes = { message: "Welcome to Chatbot" };
    const jsonResponse = JSON.parse(JSON.stringify(jsonResponses)); // clone the response structure
    const page = req.body.pageInfo.currentPage.search("pages/");

    const flag = false;
    if (flag) {
        jsonResponse.target_page = req.body.pageInfo.currentPage.substr(0, page) + page2;
        jsonResponse.fulfillment_response.messages[0].text.text = ["Helloooo from Page 2"];
    } else {
        jsonResponse.target_page = req.body.pageInfo.currentPage.substr(0, page) + page1;
        jsonResponse.fulfillment_response.messages[0].text.text = ["Helloooo from Page 1"];
    }



    res.status(200).send(jsonResponse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})