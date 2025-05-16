const express = require('express');
const port = 9000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


let tasks = [
    { name: 'finish tasks' },
    { name: 'Finish assingments ' }
];

let updatedTasks = [];


app.get('/', (req, res) => {
    return res.render('todo', {
        tasks: tasks,
        updatedTasks: updatedTasks
    });
});


app.post('/insertTask', (req, res) => {
    const newTask = { name: req.body.task };
    tasks.push(newTask);
    return res.redirect('/');
});


app.post('/deleteTask', (req, res) => {
    const taskName = req.body.task;
    tasks = tasks.filter(t => t.name !== taskName);
    return res.redirect('/');
});


app.post('/updateTask', (req, res) => {
    const oldName = req.body.oldName;
    const newName = req.body.newName;
    const task = tasks.find(t => t.name === oldName);
    if (task) {
        task.name = newName;
        updatedTasks.push({ name: newName });
    }
    return res.redirect('/');
});


app.listen(port, (err) => {
    if (err) {
        console.log("Server not started");
    } else {
        console.log("Server started on port: " + port);
    }
});