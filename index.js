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

const jsonResponses = {
    fulfillment_response: { messages: [{ text: { text: [] } }] }, // fulfillment Message
    target_page: "", // target page
    session_info: { session: "", parameters: {} }, // session info and parameters
};

app.get("/webhook", express.json(), function (req, res) {
    const jsonRes = { message: "Hello" };
    res.status(200).send(jsonRes);
});

app.get("/webhook", express.json(), function (req, res) {
    const jsonRes = { message: "Welcome to Chatbot" };
    res.status(200).send(jsonRes);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})