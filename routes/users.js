var express = require('express');
var router = express.Router();
router.use(logger);   //it works along with this router module
const mongoose = require("mongoose");
const blog = require('../models/model1');

var mongoAtlasUri = "mongodb+srv://aniajithMongodb007:1109208g@jeswacluster.inpyg8s.mongodb.net/Login?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.set('strictQuery',true);



const connectwithDB = () => {
   mongoose.connect(mongoAtlasUri, options, (err, db) => {
    if (err) {
      console.log("error" + err);
    } else {
      console.log("db connected...")
    }
  })
}

//calling the funtion..
connectwithDB();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourcesssss');
});


router.get('/all',(req,res)=>{
  //console.log(bl.find());
  blog.find().then(
    (result)=>{
      res.send(result)
    }
  ).catch((err)=>{
    console.log("error on collecting data...")
  })
})

router.get('/add',(req,res)=>{
  const bl = new blog({
    Password : "12334",
    Username : "naveeennnuus"
  });
  bl.save().then((result)=>{
    console.log(result);
    res.send(result)
  }).catch((err)=>{
    res.send(err);
  })
})







//if params comes from diffrent requestss..

//Normal way to handle it...

// router.get('/new/:id',(req,res)=>{
//   res.send(`Get with new user = ${req.params.id}`);  //using the varibales inside the respond text...
// })

// router.post('/new/:id',(req,res)=>{
//   res.send(`Post with new user = ${req.params.id}`);  //using the varibales inside the respond text...
// })

// router.put('/new/:id',(req,res)=>{
//   res.send(`put with new user = ${req.params.id}`);  //using the varibales inside the respond text...
// })

// router.delete('/new/:id',(req,res)=>{
//   res.send(`delete with new user = ${req.params.id}`);  //using the varibales inside the respond text...
// })


//Additional way to handle it

router.route('/:id')
.get((req,res)=>{
  res.send(`Get with new user = ${req.params.id}`);  //using the varibales inside the respond text...
})

.post((req,res)=>{
  res.send(`Post with new user = ${req.params.id}`);  //using the varibales inside the respond text...
})

.put((req,res)=>{
  res.send(`put with new user = ${req.params.id}`);  //using the varibales inside the respond text...
})

.delete((req,res)=>{
  res.send(`delete with new user = ${req.params.id}`);  //using the varibales inside the respond text...
})

//res withs status code send...


router.get('/rescode',(req,res)=>{
  res.status(200).send("Server Error");   //In status we can send the error code...
})

router.get('/file',(req,res)=>{
  res.download('./public/images/magthump.jpg');  //Used to download the files...
})

function logger(req,res,next){            //creating middleware funtion that executes middle of req and res...
  console.log(req.originalUrl);
  next();   //it act as middleware req-logger-res  
}

router.param('id',(req,res,next,id)=>{
  console.log(`Got an ID ${id}`)
  next();
})




module.exports = router;
