"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// @desc    Get all tasks (with optional filters)
// @route   GET /api/tasks
const getTasks = async (req, res, next) => {
    try {
        const { status, priority, category, search } = req.query;
        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }
        if (priority && priority !== 'all') {
            filter.priority = priority;
        }
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }
        const tasks = await Task_1.default.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTask = getTask;
// @desc    Create new task
// @route   POST /api/tasks
const createTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map