let dataProject = [];

function addProject(event) {
    event.preventDefault();

    let title = document.getElementById("project-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let endDate = document.getElementById("end-date-input").value;
    let description = document.getElementById("description-input").value;

    let durationTime = new Date(endDate) - new Date(startDate);

    let project = {
        title,
        durationTime,
        postAt: new Date(),
        description
    }

    dataProject.push(project);

    console.log(dataProject);
    renderProject();
}

function renderProject() {
    document.getElementById("content").innerHTML = "";

    for (let i=0; i < dataProject.length; i++) {
        document.getElementById("content").innerHTML += `
        <div class="project-card">
            <img src="./assets/images/project.png" alt="image card">
            <a href="./detail.html">
                <h2>${dataProject[i].title}</h2>
            </a>
            <p class="duration">durasi : ${getDurationTime(dataProject[i].durationTime)}</p>
            <p class="description">${dataProject[i].description}</p>
            <div class="card-icon">
                <img src="./assets/icon/play store.png" alt="play store">
                <img src="./assets/icon/android.png" alt="android">
                <img src="./assets/icon/java.png" alt="java">
            </div>
            <div class="myproject-button">
                <button>edit</button>
                <button>delete</button>
            </div>
        </div>
        `
    }
}

function getDurationTime(time) {
    let durationTime = time;

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