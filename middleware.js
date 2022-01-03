const security_middleware = (req, res, next) => {
    if (req.url.includes("login") || req.url.includes("register")) {
        console.log("tried to enter login")
        return next();
    }
    if (req.cookies.loggedin == "true") {
        console.log("entered in login true");
        return next();
    }
    console.log("redirecting..");
    res.redirect('/login');
}

module.exports = security_middleware;