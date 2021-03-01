var firebaseModules = require("./firebase")
const jwt = require('jsonwebtoken')

var auth = firebaseModules.auth
var db = firebaseModules.db

const router = require(`express`).Router()

router.put('/signup/:email', (req, res) =>
{
    const obj = req.body
    
    auth.createUserWithEmailAndPassword(obj.email.toString(), obj.password.toString())
    .then((user) => {
        console.log("User registration ok")
        obj.password = ""
        db.collection('users').doc(obj.email).set(obj)
        const token = jwt.sign({email:obj.email.toString(), accessLevel:1},
        process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
        res.json({message:"success", name:obj.email.toString(), accessLevel:1, token:token})
    })
    .catch(error => 
        {
            console.log(error)
            res.json({message:"Registration failed"})
        })
}
)

router.post('logout', (req,res) =>
{
    res.json({})
})

module.exports = router