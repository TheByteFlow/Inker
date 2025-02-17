import  jwt from "jsonwebtoken"


const ACCESS_KEY = process.env.JWT_ACCESS_SECRET
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET

const ACCESS_TOKEN_EXPIRY =  '1h'
const  REFRESH_TOKEN_EXPIRY = '7d'
export  function generateAccessToken  (payload:Object,expiresIn:string = ACCESS_TOKEN_EXPIRY):string{
   
        return jwt.sign(payload,ACCESS_KEY,{expiresIn})
    
}

export  function generateRefreshToken  (payload:Object,expiresIn:string = REFRESH_TOKEN_EXPIRY):string{
   
    return jwt.sign(payload,REFRESH_KEY,{expiresIn})

}



export  function verifyAccessToken (token:string):object|null{
    try {
        return jwt.verify(token,ACCESS_TOKEN_EXPIRY)
    } catch (error:unknown) {
        return null
    }
}

export function verifyRefreshToken (token:string):object|null{
     try {
            return jwt.verify(token,REFRESH_KEY)
     } catch (error:unknown) {
        return null
     }
}