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
app.get('/project-detail/:project_id', renderProjectDetail);
app.get('/edit-project/:project_id', renderEditProject);
app.post('/edit-project/:project_id', editProject)


app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})

function renderHome(req, res) {
    res.render("index", {
        data: projects,
    });
};

// Project Post

function renderProject(req, res) {
    res.render("add-project");
};

function renderProjectDetail(req, res) {
    const id = req.params.project_id;

    const project = projects.find( project => project.id == id );

    res.render("detail", {
        data : project,
    });
};

function addProject(req, res) {
    console.log(req.body);

    const newProject = {
        id : projects.length + 1,
        title : req.body.title,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        description : req.body.description,
        image : req.body.image
    }

    projects.unshift(newProject);

    res.redirect('/');
};

function renderEditProject(req, res) {
    const id = req.params.project_id;

    const project = projects.find( project => project.id == id )

    res.render("edit-project", {
        data : project,
    })
}

function editProject(req, res) {
    console.log(req.body);

    const id = req.params.project_id;

    const newProject = {
        id : id,
        title : req.body.title,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        description : req.body.description,
        image : req.body.image,
    };

    const index = projects.findIndex(project => project.id == id );

    projects[index] = newProject;

    res.redirect('/');
}

// End Project Post

function renderTestimnonials(req, res) {
    res.render("testimonials");
};

function renderContac(req, res) {
    res.render("contact");
};
