const express = require('express');
const session = require('express-session');
const { Sequelize, QueryTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('personalweb', 'postgres', 'postgres123', {
    host: 'localhost',
    dialect: 'postgres'
});

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'ytta',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000, secure: true},
}));

app.get('/register', renderRegister);
app.get('/login', renderLogin);
app.get('/', renderHome);
app.get('/project', renderProject);
app.get('/testimonials', renderTestimnonials);
app.get('/contact', renderContac);
app.get('/project-detail/:project_id', renderProjectDetail);
app.get('/edit-project/:project_id', renderEditProject);

app.post('/register', register);
app.post('/login', login);
app.post('/add-project', addProject);
app.post('/edit-project/:project_id', editProject);
app.get('/delete-project/:project_id', deleteProject);

app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})

// REGISTER PAGE
function renderRegister(req, res) {
    res.render('register');
}
async function register(req, res) {
    try {
        console.log(req.body);

        const query = `INSERT INTO users 
                        (name, email, password)
                        VALUES 
                        ('${req.body.name}','${req.body.email}','${req.body.password}')`;

        await sequelize.query(query);
    
        res.redirect('/login')
    } catch (error) {
        console.log(error);
    }
}

// LOGIN PAGE
function renderLogin(req, res) {
    res.render('login');
}
async function login(req, res) {
    try {
        console.log(req.body);

        const query = `SELECT * FROM users
                        WHERE
                        email = '${req.body.email}'`;
    
        const user = await sequelize.query(query, {type: QueryTypes.SELECT});
    
        if (user.length == 0) {
            console.log("Email belum terdaftar");
            res.redirect('/login');
            return
        } else if (user[0].password !== `${req.body.password}`) {
            console.log("Password salah");
            res.redirect('/login');
            return
        } else {
            req.session.user = user[0];
            req.session.isLogin = true;

            console.log("Login Berhasil");
            res.redirect('/');
        };
    } catch(error) {
        console.log(error);
    }
}

// HOME PAGE
async function renderHome(req, res) {

    console.log(req.session);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const query = `SELECT * FROM projects`;
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT});

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

        const query = `INSERT INTO projects 
                        (start_date, end_date, description, image, title)
                        VALUES 
                        ('${req.body.startDate}','${req.body.endDate}','${req.body.description}','${req.body.image}','${req.body.title}')`;
     
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
