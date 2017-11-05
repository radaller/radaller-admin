module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/user/repos") {
        req.body.full_name = req.body.name;
        req.body.permissions = {
            "pull": true
        };
        next();
    } else {
        next();
    }
};