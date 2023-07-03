const express = require('express');
require("dotenv").config();
const cors = require('cors');
const db = require('./models/index.js');

const {user} = require('./models/index');
const {order} = require('./models/index');
const app = express();
app.use(express.json());
app.use(cors());

// -------------------------------------------- A ---------------------------------------------------
app.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
        if (!/^[a-zA-Z0-9]{6,12}$/.test(username)) {
            res.status(403).send({isError: true,Msg:"username is not a valid"});
        }else{
            if (password.length < 6 || !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password)) {
                res.status(403).send({isError: true,Msg:"password is not a valid"});
            }else{
                res.status(201).send({isError: false,Msg:"User login successfully"});
            }
        }
    }catch(err){
        res.status(500).send({isError: true,Msg: err.message});
    }
})
// -------------------------------------------- B ---------------------------------------------------
app.post('/getUsers',async(req,res)=>{
    try {
        const data = await user.find({ where: { companyId: req.body.companyId } });
        res.status(201).send(data);
    } catch (err) {
        res.status(404).send({isError: true,Error: err});
    }
})
// -------------------------------------------- C ---------------------------------------------------
app.post('/getOrders',async(req,res)=>{
    try {
        const today = new Date();
        const sevenDay = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const orders = await order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [sevenDay, today],
                },
            },
        });
        res.status(201).send(orders);
    } catch (err) {
        res.status(404).send({isError: true,Error: err});
    }
})
// -------------------------------------------- D ---------------------------------------------------
class Fruit {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

const fruits = [
    new Fruit(1, 'Apple', 'Red'),
    new Fruit(2, 'Banana', 'Yellow'),
    new Fruit(3, 'Grapes', 'Green'),
    new Fruit(4, 'Orange', 'Orange'),
];


app.get('/fruits', (req, res) => {
    const sortedFruits = fruits.sort((a, b) => a.color.localeCompare(b.color));
    res.json(sortedFruits);
});


db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT, ()=>{
            console.log(`listening on port ${process.env.PORT}`);
        });
})
