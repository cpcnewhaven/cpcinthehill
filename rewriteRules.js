const path = require ("path");

MediaSourceHandle.exports = function (req, res, next) {
    // If the requested file doesn't have an extension, append ".html"
    if (!path.extname(req.url) && req.url !== "/"){
        req.url += ".html";
    }
    next();
}