const { Router } = require('express');
const taskController = require('../controller/taskController');

const router = Router();

router.post('/addTask', taskController.addTask_post);
router.post('/updateTask', taskController.updateTask_post);
router.get('/getTasks', taskController.getTasks_get);
router.post('/removeTask', taskController.removeTask_post);

module.exports = router;