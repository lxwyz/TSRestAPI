"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const newTodo = yield todos_1.Todo.create({
            title: title
        });
        res.status(200).json({ message: "New Task created successfully", newTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.createTodo = createTodo;
// GET all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todos_1.Todo.find();
        res.status(200).json(todos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.getTodos = getTodos;
//Get single todo
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todos_1.Todo.findById(req.params.id);
        if (!todo) {
            res.status(404).json({ msg: "No Task Found" });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.getTodo = getTodo;
//Delete Todo
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todos_1.Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(404).json({ msg: "No Task Found" });
            return;
        }
        res.status(200).json({ msg: "Task Deleted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.deleteTodo = deleteTodo;
//Update Todo 
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const updatedTodo = yield todos_1.Todo.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ msg: "No Task Found" });
            return;
        }
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.updateTodo = updateTodo;
