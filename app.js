const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();
app.use(express.urlencoded({extended:true}));
const mongodb = 'mongodb+srv://thanveer:aishu123@cluster0.yluhn.mongodb.net/item-database?retryWrites=true&w=majority';
mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>
    {
        console.log('connected')
        app.listen(3001)
    }).catch((err)=>console.log(err));

app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.redirect('/get-items');
})

app.get('/get-items',(req,res)=>{
    Item.find().then(result=>res.render('index',{items:result}))
    .catch(err=>console.log(err));
})


// app.get('/add-item',(req,res)=>{
//     res.render('add-items')
// })

app.post('/items',(req,res)=>{
    const item = Item(req.body);
    item.save().then(()=>res.redirect('/get-items'));
})

app.get('/items/:id',(req,res)=>{
    const id = req.params.id;
    Item.findById(id).then(result=>{
        console.log(result);
        res.render('item-detail',{item:result})
    })
})

app.get('/delete/:id',(req,res)=>{
    console.log('delete pressed');
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result=>{
        console.log('deleted');
        res.redirect('/get-items');
    })
})

app.use((req,res)=>{
    res.render('error')
})