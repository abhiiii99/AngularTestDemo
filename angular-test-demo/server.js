const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        title: String,
        description: String
    },
    { timestamps: true }
);

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const tutorial = mongoose.model("UserDetails", schema);

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/user_database";
db.tutorials = tutorial;

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Angular application." });
});

// GET call
app.get("/getUserData", async (req, res) => {
    try {
        const user = await tutorial.find({});
        res.json(user);
    } catch (error) {
        console.error('GET call error: ', error);
    }
});

// POST call
app.post("/addUser", async (req, res) => {
    try {
        const user = new tutorial(req.body);
        await user.save();
        res.json({ message: "This is the POST call." });
    } catch (error) {
        console.error('POST call error: ', error);
    }
});

// PUT call
app.put("/updateUser", async (req, res) => {
    try {
        const { id } = req.query.id;
        const { title, description } = req.body;
        await tutorial.findByIdAndUpdate(id, { title, description }, { new: true });
        res.json({ message: "This is the PUT call." });
    } catch (error) {
        console.error('PUT call error: ', error);
    }
});

// DELETE call
app.delete("/deleteUser", async (req, res) => {
    try {
        const id = req.query.id;
        await tutorial.findByIdAndDelete(new Object(id));
        res.json({ message: "This is the DELETE call." });
    } catch (error) {
        console.error('DELETE call error: ', error);
    }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(async () => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
