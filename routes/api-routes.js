const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/api/notes", async (req, res) => {
    let file = JSON.parse(await readFileAsync("./db/todos.json", "utf8"));
    res.json(file);
  }); 

  router.post("/api/notes", async (req, res) => {
    const data = JSON.parse(await readFileAsync("./db/todos.json", "utf8"));
    const newTodo = req.body;
    newTodo.id = data.length + 1;
    data.push(newTodo);
    await writeFileAsync("./db/todos.json", JSON.stringify(data, null, 2));
    res.json(data);
  });

  router.delete("/api/notes/:id", async (req, res) => {
    const data = JSON.parse(await readFileAsync("./db/todos.json", "utf8"));
    const incomingID = req.params.id;
    data.forEach((value, index) => {
      if (value.id == incomingID) {
        data.splice(index, 1);
      }
    });
    await writeFileAsync("./db/todos.json", JSON.stringify(data, null, 2));
    res.json({ msg: "Successfully deleted the todo" });
  });
  module.exports = router;
