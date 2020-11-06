const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasks");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Tasks.getTasks();
    if (tasks.length) {
      res.status(200).json(tasks);
    } else {
      next({ code: 404, message: "no tasks found" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Tasks.getTasksById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      next({ code: 400, message: "no task found with given id" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const task = await Tasks.addTask(req.body);
    if (task) {
      res.status(201).json(task);
    } else {
      next({ code: 400, message: "unable to add new task" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
