"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
// All task routes require authentication
router.use(authMiddleware_1.protect);
router.route('/').get(taskController_1.getTasks).post(taskController_1.createTask);
router.route('/:id').get(taskController_1.getTask).put(taskController_1.updateTask).delete(taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map