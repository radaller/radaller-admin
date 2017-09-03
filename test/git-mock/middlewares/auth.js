module.exports = (req, res, next) => {
    if (req.get("Authorization") === "token valid_token") {
        next()
    } else {
        res.status(401);
        res.end(JSON.stringify({
                "message": "Bad credentials",
                "documentation_url": "https://developer.github.com/v3"
            }
        ));
    }
};