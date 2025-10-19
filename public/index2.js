const express = require("express");
const app = express();
app.use(express.static("public"));
app.use("/", function(_, response) {
    response.send("<h1>Главная страница</h1>");
});

app.listen(3001);