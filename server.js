const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var logger = require("morgan");
var process = require('process');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger("dev"));

const db = require("./app/models");


var admin = require("firebase-admin");

var serviceAccount = require("./firebase-admin-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const url = `mongodb+srv://root:root@cluster0.rjs6o.mongodb.net/tukangid?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
db.mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

require("./app/routes/auth.routes")(app);
require("./app/routes/player.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/partner.routes")(app);
require("./app/routes/midtrans.routes")(app);
require("./app/routes/notification.routes")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);})
    