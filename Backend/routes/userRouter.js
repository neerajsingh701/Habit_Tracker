import express from 'express'
import { register, login } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { addHabit, deletedHabit, editHabbits, getHabbits, Markcompleted } from '../controllers/habitController.js';


const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

userRouter.post('/add-habits', authMiddleware, addHabit)
userRouter.delete('/habits/:id', deletedHabit)
userRouter.get('/habits', authMiddleware, getHabbits)
userRouter.put('/habits/:id', authMiddleware, editHabbits)
userRouter.put('/habits/completed/:id', authMiddleware, Markcompleted)

export default userRouter