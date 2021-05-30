const Joi = require('joi');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const testrouter = require("./route");
app.use('', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
 app.use(express.json());
 app.use(
    express.urlencoded({
      extended: false,
    })
  );



let courses = [
    {id:1,name:'Couses1'},
    {id:2,name:'Couses2'},
];
app.use('/test',testrouter);
app.get('/',(req,res)=>{
    res.send('Hello//');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
app.get('/api/courses/:id',(req,res)=>{
    // const schema ={
    //     name:Joi().string().min(3).required()
    // }
    // const result = Joi.validate(req.body,schema);
    // console.log(result);
      let course = courses.find(c=> c.id === parseInt(req.params.id) );
if (!course) res.status(404).send("The item not register");
res.send(course);
});

app.post('/api/courses',(req,res)=>{
    console.log(req.body);
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send('The name is required and should be atleat 3 character');
        return;
    }
   
    let course = {
        id: courses.length+1,
        name : req.body.name
    }

    courses.push(course);
    res.send(course);
});



const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`at port ${port}`));