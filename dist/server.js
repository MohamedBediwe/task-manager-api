"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
// Load env vars
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
});
// Error handler (must be last)
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map