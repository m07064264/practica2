const express = require("express");
const app = express();
app.use(function(_, response) {
    
    response.send("<h2>hello</h2>");
});

app.get("/", function(request, response) {

    response.send("<h1>главная страница</h1>");
});
app.get("/about", function(request, response){
    response.send("<h1>О сайте<h1?");
});
app.get("/contact", function(request, response){
    response.send("<h1>Контакты<h1?");
});
app.get("/login", function(request, response){
    response.send("<h1>Войти<h1?");
});
app.get("/registration", function(request, response){
    response.send("<h1>Зарегистрироваться<h1?");
});

app.listen(3001);