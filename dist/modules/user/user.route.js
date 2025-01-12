"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_1 = require("../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(user_validation_1.UserValidation.createStudentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(user_validation_1.UserValidation.createFacultyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.createAdmin);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.FACULTY), user_controller_1.UserController.updateUser);
router.get('/user', user_controller_1.UserController.getAllUser);
router.get('/:id', user_controller_1.UserController.getSingleUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRouter = router;
