var firebaseModules = require("./firebase")
const jwt = require('jsonwebtoken')

var auth = firebaseModules.auth
var authAdmin = firebaseModules.authAdmin
var db = firebaseModules.db

const router = require(`express`).Router()

router.put('/login/:email', (req, res) =>
{
    const obj = req.body
    
    auth.signInWithEmailAndPassword(obj.email.toString(), obj.password.toString())
    .then((user) => {
        console.log("ok")
        if(obj.email.toString()==="matjas9@gmail.com" || obj.email.toString()==="iherkt98@gmail.com" )
        {
            const token = jwt.sign({email:obj.email.toString(), accessLevel:1},
            process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
            res.json({message:"success", name:obj.email.toString(), accessLevel:1, token:token})
        } else {
            const token = jwt.sign({email:obj.email.toString(), accessLevel:2},
            process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
            res.json({message:"success", name:obj.email.toString(), accessLevel:2, token:token})
        }
        
        
    })
    .catch(error => 
        {
            console.log(error.code)
            res.json({message:error.code})
        })
}
)

router.put('/update-profile', (req, res) =>
{
    const obj = req.body
    authAdmin.getUserByEmail(req.body.oldMail).then((user) => {
       authAdmin.updateUser(user.uid, {email: req.body.email}, {password: req.body.password})
       res.json({message:"success", newMail:req.body.email}) 
    }) 
}
)

router.put('/forgot-password', (req, res) =>
{
    const emailTosend = req.body.email
    auth.sendPasswordResetEmail(emailTosend.toString()) 
    res.json({message:"success"})
}
)



router.post('logout', (req,res) =>
{
    res.json({})
})

module.exports = router