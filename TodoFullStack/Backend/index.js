const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const app = express();
app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  console.log(createPayload);
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "you put the wrong inputs",
    });
  }
  const todo = await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  console.log(todo);
  res.send("todo");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  return res.send(todos);
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "wrong inputs",
    });
  }

  await Todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.send("Completed");
});

app.listen(3000, () => {
  console.log("Server is running in 3000");
});
