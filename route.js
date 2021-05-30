var express = require('express');
var ROUTER = express.Router();
ROUTER.post('/post',(req,res)=>{
console.log(req.body);
});
module.exports = ROUTER;