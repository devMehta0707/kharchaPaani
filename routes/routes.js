import express from 'express'
const router = express.Router();
import {addRecord, dashboard, index, register,logout} from '../controllers/UserController.js';

// LOGIN=====
router.get('/',index)
router.post('/',index)

// REGISTER====

router.get('/register',register)
router.post('/register',register)

// DASHBOARD====

router.get('/dashboard',dashboard)
router.post('/dashboard',addRecord)
router.get('/logout',logout)

export default router;