const jwt = require('jsonwebtoken')
const adminauthMiddleware = (req, res, next) => {
    console.log("inside authentication middleware")
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token)
    // verifying token
    if(token){
        try {
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
        console.log(jwtResponse)
        req.payload = jwtResponse.userEmail
        const role=jwtResponse.role
        if(role=='admin'){
        next()
        }
        else{
            res.status(401).json("Authorization failed... un-authorized access")
        }

    }
    // invalid token verification -> throws an error
    catch (err) {
        res.status(401).json("Invalid Token... Please Login")
    }
    }
    else{
        res.status(401).json("Authorization failed!...Token is missing")
    }
    // next()
}

module.exports = adminauthMiddleware