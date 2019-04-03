const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req, res, next) => {
        const { token } = req.cookies;
        let result;
        if(token){
            const options = {
                expiresIn: '2d'
            };
            try{
                result = jwt.verify(token, process.env.JWT_SECRET, options);
                req.decoded = result;
                next();
            }catch(err){
                throw new Error(err);
            }
        }else{
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    },

    validateToken1: (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        console.log("authorizationHeader ..... ", authorizationHeader);
        let result;
        if(authorizationHeader){
            const token = JSON.parse(req.headers.authorization.split(" ")[1]);
            console.log("token >>>>>>>>>>>>>>>> ", token['token']);
            const options = {
                expiresIn: '2d'
            };
            try{
                result = jwt.verify(token['token'], process.env.JWT_SECRET, options);
                req.decoded = result;
                next();
            }catch(err){
                throw new Error(err);
            }
        }else{
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
}