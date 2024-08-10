//Import library/module
const express = require('express');
const session = require('express-session');
const { Sequelize, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const upload = require('./middlewares/uploadFIle');

const app = express();
const port = 3000;

//Connect to database with squelize
const sequelize = new Sequelize('personalweb', 'postgres', 'postgres123', {
    host: 'localhost',
    dialect: 'postgres'
});

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/assets", express.static("assets"));
app.use("/file-uploads", express.static("file-uploads"))

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'ytta',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 360000, secure: false, httpOnly: true},
    store: new session.MemoryStore(),
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
app.post('/add-project', upload.single('image'), addProject);
app.post('/edit-project/:project_id', editProject);

app.get('/delete-project/:project_id', deleteProject);
app.get('/logout', logout);

app.listen(port, () => {
    console.log(`Aplikasi berjalan pada port ${port}`);
})

// REGISTER PAGE
function renderRegister(req, res) {
    const isLogin = req.session.isLogin;
    
    isLogin ? res.redirect('/') : res.render('register');
}
async function register(req, res) {
    try {
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const query = `INSERT INTO users 
                        (name, email, password)
                        VALUES 
                        ('${name}','${email}','${hashedPassword}')`;

        await sequelize.query(query);
    
        res.redirect('/login')
    } catch (error) {
        console.log(error);
    }
}

// LOGIN PAGE
function renderLogin(req, res) {
    const isLogin = req.session.isLogin;

    isLogin ? res.redirect('/') : res.render('login');
}
async function login(req, res) {
    try {
        console.log(req.body);
        const {email, password} = req.body;

        const query = `SELECT * FROM users
                        WHERE
                        email = '${email}'`;
    
        const user = await sequelize.query(query, {type: QueryTypes.SELECT});
    
        if (user.length == 0) {
            console.log("Email belum terdaftar");
            return res.redirect('/login');
        } 

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            console.log("Password salah");
            return res.redirect('/login');
        } 

        req.session.user = user[0];
        req.session.isLogin = true;

        console.log("Login Berhasil");
        console.log(req.session.user);
        // console.log(req.session);
        res.redirect('/');

    } catch(error) {
        console.log(error);
    }
}

// LOGOUT
function logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
}

// HOME PAGE
async function renderHome(req, res) {
    // console.log(req.session);
    const {isLogin, user} = req.session;
    console.log(user);

    const query = `SELECT * FROM projects`;    
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT});

    res.render("index", {
        data: projects,
        isLogin,
        user,
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
    const isLogin = req.session.isLogin;

    isLogin ? res.render("add-project") : res.redirect('/login');
};
async function addProject(req, res) {
    try {
        console.log(req.body);
        
        const {title, startDate, endDate, description} = req.body;
        const image = req.file.path;
        const durationTime = getDurationTime(endDate, startDate);

        const query = `INSERT INTO projects 
                        (title, start_date, end_date, description, technologies, image, duration_time)
                        VALUES 
                        ('${title}','${startDate}','${endDate}','${description}',ARRAY['${req.body.technologies1}','${req.body.technologies2}','${req.body.technologies3}','${req.body.technologies4}'],'${image}', '${durationTime}')`;
     
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

// Duration Time
function getDurationTime(endDate, startDate) {
    let durationTime = new Date(endDate) - new Date(startDate);

    let miliSecond = 1000;
    let secondInDay = 86400;
    let dayInMonth = 30;
    let monthInYear =12;

    let durationTimeInDay = Math.floor(durationTime / (miliSecond * secondInDay));
    let durationTimeInMonth = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth));
    let durationTimeInYear = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth * monthInYear));

    let restOfMonthInYear = Math.floor((durationTime%(miliSecond * secondInDay * dayInMonth * monthInYear)) / (miliSecond * secondInDay * dayInMonth))

    if (durationTimeInYear > 0 ) {
        if (restOfMonthInYear > 0) {
            return `${durationTimeInYear} tahun ${restOfMonthInYear} bulan`;
        } else {
            return `${durationTimeInYear} tahun`;
        }
    } else if (durationTimeInMonth > 0 ) {
        return `${durationTimeInMonth} bulan`;
    } else {
        return `${durationTimeInDay} hari`
    }
}
