let dataProject = [];

function addProject(event) {
    event.preventDefault();

    let title = document.getElementById("project-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let endDate = document.getElementById("end-date-input").value;
    let description = document.getElementById("description-input").value;

    let project = {
        title,
        startDate,
        endDate,
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
            <p class="duration">durasi : 3 bulan</p>
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