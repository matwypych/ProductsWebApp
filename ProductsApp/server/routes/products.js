var firebaseModules = require("./firebase")
const jwt = require('jsonwebtoken');
const { query } = require("express");

var crypto = require('crypto');
var hash = crypto.createHash('md5');

var db = firebaseModules.database

const router = require(`express`).Router()

// produkty
var jsonData;
var resultjsonData = [];
var selectedObj = {
    confirmed:false,
    name:"",
    weight:"",
    id:""
};

db.ref('/Products').on('value',gotData,errData)
var ref = db.ref('Products')


// show all
router.get(`/products-list/`, (req,res) => 
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1){
                res.send(jsonData)
            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )
})

// add
router.post(`/add-product/`, (req, res) => 
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1 || decodedToken.accessLevel == 2){
                var datetime = new Date();

                const str1  = datetime.toISOString().slice(0,19)
               
                const obj = req.body
                const str2 = obj.name
                const idHash = str1.concat(str2)
                
                obj.id = idHash
                console.log(obj)
                ref.child(idHash).set(obj)
                res.json({message:"success"})

            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )
   
})

// read one
router.get(`/update-product/:id`, (req,res) => 
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1){

                /*
                const refkey = ref.child(req.params.id)
                refkey.once('value'), function(snap) {
                    console.log(snap.val().name)
                    console.log(snap.val().weight)
                    console.log(snap.val().id)
                }
*/
                
                const fetchedResults = [];
                for (let key in jsonData){
                    fetchedResults.unshift(
                        {
                            ...jsonData[key],
                            id:key
                        }
                    )
                }

            
                for(var i=0; i<fetchedResults.length;i++){
                    if(fetchedResults[i].id === req.params.id){
                        selectedObj.confirmed = fetchedResults[i].confirmed
                        selectedObj.id = fetchedResults[i].id
                        selectedObj.name = fetchedResults[i].name
                        selectedObj.weight = fetchedResults[i].weight
                        console.log(selectedObj)
                        res.send(selectedObj)
                    }
                }
            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )
})

// Update one record
router.put(`/update-product/:id`, (req,res) => 
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1){
    
                const obj = req.body
                const idrecProd = req.params.id
                console.log(obj)
                console.log(idrecProd)
                ref.child(idrecProd).set(obj).then().catch()
                res.json({message:"success"})

            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )
})

//confirm one product
router.put(`/confirm-product/:id`, (req,res) => 
{
    
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
    
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1){
              
                const confId = req.params.id
                console.log(confId)
                ref.child(confId).update({'confirmed' :true})
                res.json({message:"success"})
            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )
})


// Delete one record
router.delete(`/delete/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"}, (err,decodedToken) =>{
        if(err){
            res.json({errorMesage:err})
        } else {
            if(decodedToken.accessLevel == 1){
    
                const deleteProdId = req.params.id                
                ref.child(deleteProdId).remove()
                res.json({message:"success"})

            } else {
                res.json({errorMesage:`User is not permitted to see this page`})
            }
        }
    } )      
})

function gotData(data) {
     jsonData = data.val()
}

function errData(err) {
    console.log(err)
}
            
module.exports = router