const express = require("express"),
http = require("http"),
path = require('path'),
app = express();
const pool = require('./config/bd');


const navRouter = express.Router(),
mainRouter = express.Router(),
bookPagesRouter = express.Router();

app.use(express.static(__dirname)),
app.use("/", mainRouter),
app.use("/navigation", navRouter),
app.use("/bookPages", bookPagesRouter);

app.set("view engine", "hbs");


//const server = http.createServer((req, res) => { });


mainRouter.get("/", function(req, res) {
    
    res.sendFile(path.join(__dirname, 'html//index1.html'));
});

mainRouter.get("/reg", function(req, res) {

    res.sendFile(path.join(__dirname, 'html//reg.html'));
    
    }); 

mainRouter.get("/log-in", function(req, res) {
    res.sendFile(path.join(__dirname, "/html/log-in.html"));
});


navRouter.get("/главное", function(req, res){
res.sendFile(path.join(__dirname, 'html//navigation//главное.html'));
});

navRouter.get("/доставка и оплата", function(req, res){
res.sendFile(path.join(__dirname, 'html//navigation//доставка и оплата.html'));
});

navRouter.get("/избранное", function(req, res){
res.sendFile(path.join(__dirname, "/html/navigation/избранное.html"));
});

app.use("/html/bookPages/book0001.html", function(_, res) {
    res.render("/html/book page.hbs", {
        title: "книга1",
        annotations: "описание",
        img: "242-0 (1).webp"
    });
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.post("/html/reg", async function(req, res) {

  const email = req.body.email;
  const phone_number = req.body.number;
  const password = req.body.password;

  const result = await pool.query('INSERT INTO customer (mail, phone_number, password)VALUES ($1, $2, $3) RETURNING *', [email, phone_number, password]);
  
res.redirect("/html/log-in.html");

});

app.post("/html/log-in", async function(req, res) {
  const log = req.body.log;
  const password = req.body.password;
  

  const logResult = await pool.query(
    'SELECT COUNT(*) AS count FROM customer WHERE mail=$1 OR phone_number=$1',
    [log]
  );
  const logCount = parseInt(logResult.rows[0].count, 10);

  if (logCount === 0) {
    
    return res.end("неверные данные");
  }

  
  const userResult = await pool.query(
    'SELECT * FROM customer WHERE mail=$1 OR phone_number=$1',
    [log]
  );

  if (userResult.rows.length === 0) {
    return res.end("неверные данные");
  }

  const user = userResult.rows[0];


  if (user) {
    res.redirect("/html/index1.html");
    
    
  } else {
     res.redirect("/html/log-in.html");

  }
});

pool.query('SELECT NOW()', (err, res) => {
  if(err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database:', res.rows);
  }
});

app.post('/search-request', async function (req, res) {

  let search_request = req.body.search;
   const searchPattern = `%${search_request}%`;
  let result = await pool.query(
    'select title from book where title like $1', [searchPattern]
  );
     res.json(result.rows); 
});




app.listen(3001, '127.0.0.1', () => {

});