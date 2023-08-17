const express = require('express');
const cors = require("cors")
require('./db/config');
const User = require('./db/user'); // Assuming User is the model for the user schema
const Product = require('./db/product');
const app = express();

const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    const user = new User(req.body);
    const result = await user.save();
    const updatedResult = result.toObject();
    delete updatedResult.password;
    jwt.sign({updatedResult}, jwtkey, {expiresIn:'2h'}, (err, token)=>{
        if(err)
            res.send("something went wrong.")
        else
            res.send({updatedResult,auth: token});

    })
    // res.send(updatedResult);
  });


app.post("/login", async (req, res) => {
    console.log(req.body);
    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
            jwt.sign({user}, jwtkey, {expiresIn:'2h'}, (err, token)=>{
                if(err)
                    res.send("something went wrong.")
                else
                    res.send({user,auth: token});

            })
        }
        else
            res.send("result: No such user exists.")

    }
    else{
        res.send("Invalid Entries");
    }
})

app.post("/add-product",async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
})

app.get("/", async (req, res) => {
    let products = await Product.find();
    if(products.length > 0)
    {
        res.send(products);
    }
    else{
        res.send(`result:"No data to show"`)
    }
})

app.delete("/product/:id" ,async (req, res) => {
    let result = await Product.deleteOne({"_id" : req.params.id})
    res.send(result);
})

app.get("/product/:id", async(req, res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result)
    {
        res.send(result);
    }
    else{
        res.send("No such product exists");
    }
})

app.put("/product/:id",async (req, res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get("/search/:key",async (req, res)=>{
    let result = await Product.find({
        "$or": [
            {name: {$regex :req.params.key}},
            {price: {$regex :req.params.key}},
            {category: {$regex :req.params.key}},
            {company: {$regex :req.params.key}}
        ]
    })
    res.send(result);
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
