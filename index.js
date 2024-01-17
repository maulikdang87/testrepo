const express = require ("express");
const app = express();

function calc(n) {
    let ans = 0 ;
    for (let i = 0 ; i < n ; i++)
    {
        ans = ans + i;
    }
    return ans;
}



app.get("/",function(req,res){
    const a = req.query.n;
    const v1 = calc(a);
     
    res.send("your answer is "+ v1);
    
  
    
   

})



app.listen(3000);

