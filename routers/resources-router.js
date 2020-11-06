const express = require("express");
const router = express.Router();
const Resources = require("../models/resources");

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.getResources();
    if (resources.length) {
      res.status(200).json(resources);
    } else {
      next({ code: 404, message: "there are no resources here" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await Resources.getResourcesById(id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      next({ code: 404, message: "no resource found with given id" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

router.post("/", validatePost, async (req, res, next) => {
  try {
    const newResource = await Resources.addResource(req.body);
    if (newResource) {
      res.status(201).json(newResource);
    } else {
      next({ code: 400, message: "something went wrong" });
    }
  } catch (err) {
    next({ code: 500, message: err.message });
  }
});

function validatePost(req, res, next) {
  if (!req.body.name) {
    next({ code: 400, message: "please provide a name for the resource" });
  } else {
    next();
  }
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
