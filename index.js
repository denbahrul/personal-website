const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/project', (req, res) => {
    res.render("add-project")
})

app.get('/testimonials', (req, res) => {
    res.render("testimonials")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})

app.get('/detail', (req, res) => {
    res.render("detail")
})

app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})
