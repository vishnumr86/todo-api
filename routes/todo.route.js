import express from 'express';
import todoModel from '../models/todo.model.js';

const router= express.Router();

// Create todo
router.post("/", async (req, res) => {
  try {
    const todo = await todoModel.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(404).json({ error: "Todo not found" });
  }
});

export default router;