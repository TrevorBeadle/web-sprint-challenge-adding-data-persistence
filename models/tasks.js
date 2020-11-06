const db = require("../data/db-config");

module.exports = {
  getTasks,
  getTasksById,
  addTask,
};

function getTasks() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "p.name as project_name",
      "p.description as project_description",
      "t.*"
    );
}

function getTasksById(id) {
  return db("tasks").where({ id }).first();
}

function addTask(data) {
  return db("tasks")
    .insert(data)
    .then(id => {
      return getTasksById(id);
    });
}
