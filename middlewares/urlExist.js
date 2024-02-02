import URL from '../model/url.js';

export const isUrlExist = async (req, res, next) => {
    try {
        if (!req.body.url) {
            res.status(400).json({
                success: false,
                message: 'Please provide URL...'
            })
        } else {
            const url = await URL.findOne({ redirectUrl: req.body.url });
            if (url) {
                res.status(200).json({
                    success: true,
                    message: 'Short URL is generated..',
                    shortURL: `http://localhost:8000/${url.shortID}`
                })
            } else {
                next();
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}

