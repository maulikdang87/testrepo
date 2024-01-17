const express = require ("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());


const users =[{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}]
function atLeastOneUnHealthyKidney(){
    let atLeastOneUnHealthyKidney = false;
    for (let i = 0 ; i < users[0].kidneys.length ; i++){
        if (!users[0].kidneys[i].healthy){
            atLeastOneUnHealthyKidney = true
        }
    }
    return atLeastOneUnHealthyKidney;
}


app.get('/', function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0 ; i < johnKidneys.length ; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys += 1;

        }
    }
    let numberOfUnhealthyKidneys = numberOfKidneys- numberOfHealthyKidneys;
    res.json({
        johnKidneys,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    })
})



app.put('/', function(req,res){
    for(let i = 0 ; i < users[0].kidneys.length; i ++){
        users[0].kidneys[i].healthy = true;

    }

    res.json({});
})

app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg : "DONE"
    })
})


app.delete ('/', function(req,res){
    const newKidneys = []
    if (atLeastOneUnHealthyKidney){
        for(let i = 0 ; i < users[0].kidneys.length ; i++){
            if (users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true
                })
            }
        }
        console.log(newKidneys)
        users[0].kidneys = newKidneys;
        res.json({
            msg:"done"
        })

    }
    else{
        res.sendStatus(411);
        res.json({
            msg:"you have no bad kidney"
        })
    }
   
    
    

})
app.listen(port)