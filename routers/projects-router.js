const express = require("express");
const router = express.Router();
const Project = require("../models/projects");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.getProjects();
    if (projects.length) {
      res.status(200).json(projects);
    } else {
      next({ code: 400, message: "no projects found" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.getProjectsById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      next({ code: 404, message: "no project found with given id" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.post("/", validatePost, async (req, res, next) => {
  try {
    const newProject = await Project.addProject(req.body);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      next({ code: 400, message: "something went wrong" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

function validatePost(req, res, next) {
  if (!req.body.name) {
    next({ code: 400, message: "please provide a name for the project" });
  } else {
    next();
  }
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
