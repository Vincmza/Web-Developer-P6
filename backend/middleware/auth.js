const jwt = require("jsonwebtoken");
require("dotenv").config();

/*Check if user is authentified because of the token*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.secretToken);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({ message: "email inconnu" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Requête non authentifiée !" });
    }
};
