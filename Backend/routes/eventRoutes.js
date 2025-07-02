const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', eventController.list);
router.post('/', authMiddleware, roleMiddleware('organizer'), eventController.create);
router.get('/report', authMiddleware, roleMiddleware('organizer'), eventController.report)


module.exports = router;
