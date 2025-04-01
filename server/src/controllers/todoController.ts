import { RequestHandler } from "express";
import { Todo } from "../models/todos";

export const createTodo: RequestHandler = async (req, res) => {
    try {
        const {title} = req.body;
        const newTodo = await Todo.create({
            title: title
        })
        res.status(200).json({message: "New Task created successfully",newTodo});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

// GET all todos
export const getTodos: RequestHandler = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

//Get single todo
export const getTodo: RequestHandler = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            res.status(404).json({msg: "No Task Found"});
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

//Delete Todo
export const deleteTodo: RequestHandler = async (req,res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo) {
            res.status(404).json({msg: "No Task Found"});
            return;
        }
        res.status(200).json({msg: "Task Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error"});
    }
}


//Update Todo 
export const updateTodo: RequestHandler = async (req, res) => {
    try {
        const {title} = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {title}, {new: true});
        if(!updatedTodo) {
            res.status(404).json({msg: "No Task Found"});
            return;
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}