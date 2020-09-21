const express = require("express");
const app = express();
const compression = require("compression");
const Instagram = require("instagram-web-api");
// const { username, password } = process.env;
const username = "test.medi";
const password = "1089980";
const client = new Instagram({ username, password });

app.use(compression());

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/hi", function (req, res) {
    console.log("i try to run");
    (async () => {
        try {
            await client.login();
            const photo = "https://i.imgur.com/OZ1Otu1.jpg";
            await client.uploadPhoto({
                photo,
                caption: "❤️",
                post: "story",
            });
        } catch (err) {
            console.log(err);
        }
        // const profile = await client.getProfile();

        // console.log(profile);
        res.json({ ffg: "dsds" });
    })();
});
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
