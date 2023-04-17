/* eslint-disable prettier/prettier, require-jsdoc */
import passport from "passport";

export async function isUserAuth(req, res, next){
    try {        
        passport.authenticate('local', (err, user, info)=>{
            if(err){ return next(err) }
            if(!user){
                return res.status(401).json({status: 401, message: info.message})
            }
            req.user = user
            next()
        })(req, res, next)
    } catch (error) {
        /* istanbul ignore next */
        return res.status(500).json({message: "Server Error"})
    }
}

