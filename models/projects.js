const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectsById,
  addProject,
};

function getProjects() {
  return db("projects");
}

function getProjectsById(id) {
  return db("projects").where({ id }).first();
}

function addProject(data) {
  return db("projects")
    .insert(data)
    .then(id => {
      return getProjectsById(id);
    });
}
