import URL from '../model/url.js';
import { formatTimestamp } from '../utils/formatTimeStamp.js';
import { generateShortId } from '../utils/utils.js'

export const createShortURL = async (req, res) => {
    try {
        const shortID = generateShortId();
        const url = await URL.create({ shortID, redirectUrl: req.body.url });
        if (url) {
            res.status(201).json({
                success: true,
                message: 'Short Url Created Successfully...',
                shortURL: `http://localhost:8000/${shortID}`
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Duplicate Entry, Please try again',
        })
    }
}


export const redirectURL = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                success: false,
                message: 'Invalid URL'
            })
        } else {
            const originalURL = await URL.findOneAndUpdate({ shortID: req.params.id }, {
                $push: {
                    visitHistory: {
                        timestamp: formatTimestamp(Date.now())
                    }
                }
            });
            if (!originalURL) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid URL..',
                })
            } else {
                res.status(302).redirect(originalURL.redirectUrl);
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}


export const analytics = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Invalid URL' })
        } else {
            const result = await URL.findOne({ shortID: req.params.id });
            res.status(200).json({
                totalClicks: result.visitHistory.length,
                timestamp: result.visitHistory
            })
        }
    } catch (error) {
        console.log(error);
        res.end();
    }
}
