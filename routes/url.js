import express from 'express'
import { analytics, createShortURL, redirectURL } from '../controller/url.js';
import { isUrlExist } from '../middlewares/urlExist.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Working Fine...'
    })
})

router.post('/url', isUrlExist, createShortURL);
router.get('/:id', redirectURL);
router.get('/analytics/:id', analytics);

export default router;