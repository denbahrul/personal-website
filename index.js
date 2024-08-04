const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: false }))

const projects = []

app.get('/', renderHome);
app.get('/project', renderProject);
app.post('/add-project', addProject)
app.get('/testimonials', renderTestimnonials);
app.get('/contact', renderContac);
app.get('/detail', renderProjectDetail);

app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})

function renderHome(req, res) {
    res.render("index", {
        data: [...projects],
    });
};

function renderProject(req, res) {
    res.render("add-project", {
        data: projects
    });
};

function addProject(req, res) {
    console.log(req.body);
    projects.push(req.body)

    res.redirect('/project');
}

function renderTestimnonials(req, res) {
    res.render("testimonials");
};

function renderContac(req, res) {
    res.render("contact");
};

function renderProjectDetail(req, res) {
    res.render("detail");
};