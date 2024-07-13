export const isAdmin = (req, res, next) => {
    const rol = req.user.rol === "admin" ? 1 : 0;
    if(req.user.rol === "admin") return next();
    else res.render("accessDenied", {rol, userName: req.user.first_name});
}

export const isUser = (req, res, next) => {
    const rol = req.user.rol === "admin" ? 1 : 0;
    if(req.user.rol === "user") return next();
    else res.render("accessDenied", {rol, userName: req.user.first_name});
}