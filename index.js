const express = require('express');
const app = express();
const port = 3000;
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('personalweb', 'postgres', 'postgres123', {
    host: 'localhost',
    dialect: 'postgres'
});

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.get('/', renderHome);
app.get('/project', renderProject);
app.get('/testimonials', renderTestimnonials);
app.get('/contact', renderContac);
app.get('/project-detail/:project_id', renderProjectDetail);
app.get('/edit-project/:project_id', renderEditProject);
app.get('/register', renderRegister)
app.get('/login', renderLogin);

app.post('/add-project', addProject)
app.post('/edit-project/:project_id', editProject);
app.get('/delete-project/:project_id', deleteProject);

app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})

// REGISTER PAGE
function renderRegister(req, res) {
    res.render('register');
}

// LOGIN PAGE
function renderLogin(req, res) {
    res.render('login');
}

// HOME PAGE
async function renderHome(req, res) {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const query = `SELECT * FROM projects`;
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT});

    console.log(projects);

    res.render("index", {
        data: projects,
    });
};
// delete
async function deleteProject(req, res) {
    try {
        const id = req.params.project_id;

        const query = `DELETE FROM projects WHERE id=${id}`;

        await sequelize.query(query);
    
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

// EDIT PROJECT PAGE
async function renderEditProject(req, res) {
    try {
        const id = req.params.project_id;

        const query = `SELECT * FROM projects WHERE id=${id}`;
    
        const project = await sequelize.query(query, {type: QueryTypes.SELECT});
    
        console.log(project);
    
        res.render("edit-project", {
            data : project[0],
        });
    } catch (error) {
        console.log(error);
    }
};

async function editProject(req, res) {
    try {
        console.log(req.body);

        const id = req.params.project_id;
    
        const query = `UPDATE projects 
        SET start_date = '${req.body.startDate}', end_date = '${req.body.endDate}', description = '${req.body.description}', image = '${req.body.image}', title = '${req.body.title}'
        WHERE id = ${id}`;

        await sequelize.query(query);
    
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

// DETAIL PAGE
async function renderProjectDetail(req, res) {
    const id = req.params.project_id;

    const query = `SELECT * FROM projects WHERE id=${id}`;
    const result = await sequelize.query(query, { type: QueryTypes.SELECT});

    console.log(result);

    res.render("detail", {
        data : result[0],
    });
};

// ADD PROJECT PAGE
function renderProject(req, res) {
    res.render("add-project");
};

async function addProject(req, res) {
    try {
        console.log(req.body);

        const query = `INSERT INTO projects (start_date, end_date, description, image, title)
         VALUES ('${req.body.startDate}','${req.body.endDate}','${req.body.description}','${req.body.image}','${req.body.title}')`;
     
         await sequelize.query(query);
     
         res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

// TESTIMONIALS PAGE
function renderTestimnonials(req, res) {
    res.render("testimonials");
};

// CONTACT PAGE
function renderContac(req, res) {
    res.render("contact");
};
