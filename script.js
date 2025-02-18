document.getElementById('activityForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const activityName = document.getElementById('activityName').value;
    const activityDate = document.getElementById('activityDate').value;

    if (activityName && activityDate) {
        const activity = {
            name: activityName,
            date: new Date(activityDate),
            completed: false
        };

        addActivityToList(activity);
        saveActivities();
    }
});

let activities = [];

function loadActivities() {
    const savedActivities = JSON.parse(localStorage.getItem('activities'));
    if (savedActivities) {
        activities = savedActivities;
        renderActivities();
    }
}

function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

function addActivityToList(activity) {
    activities.push(activity);
    activities.sort((a, b) => a.date - b.date);
    renderActivities();
}

function renderActivities() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';

    activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', activity.completed);

        const date = activity.date.toLocaleString();
        li.innerHTML = `
            <span>${activity.name} - ${date}</span>
            <div>
                <button onclick="toggleComplete(${index})">${activity.completed ? 'Desmarcar' : 'Marcar como completada'}</button>
                <button class="delete" onclick="deleteActivity(${index})">Eliminar</button>
            </div>
        `;
        activityList.appendChild(li);
    });
}

function toggleComplete(index) {
    activities[index].completed = !activities[index].completed;
    saveActivities();
    renderActivities();
}

function deleteActivity(index) {
    activities.splice(index, 1);
    saveActivities();
    renderActivities();
}

loadActivities();