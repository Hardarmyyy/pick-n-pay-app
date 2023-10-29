const isAdmin = (...permission) => {

    return (req, res, next) => {

        if (!req?.userRole) return res.sendStatus(401)

        const rolesArray = [...permission]
        const currentRole = req.userRole
        const allowedRole = currentRole.find(role=> rolesArray.includes(role))

        if (allowedRole) {
            next()
        }
        else {
            return res.status(401).json({error:`You're not allowed to view this page`})
        }
    }
}

module.exports = { 
    isAdmin
}