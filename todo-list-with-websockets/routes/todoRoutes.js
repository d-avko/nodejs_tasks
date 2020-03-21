const express = require("express");
const todoListController = require("../controllers/TodoListController").todoListController;

const todoRoutes = express.Router(null);

todoRoutes.get("/", (req, res) => todoListController.index(req, res));
todoRoutes.put("/", (req, res) => todoListController.create(req, res));
todoRoutes.patch("/:id",(req, res) => todoListController.update(req, res));
todoRoutes.delete("/:id",(req, res) => todoListController.delete(req, res));

module.exports = todoRoutes;
