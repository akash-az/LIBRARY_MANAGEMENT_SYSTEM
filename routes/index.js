const express = require('express')               // import expres bcus we are using express
const router =  express.Router()                   // import router part of express and this router variable we created we can create routes

router.get('/', (req,res) => {
    // res.send('hello world')  })             
    // res.send("hello")
    res.render('index')

})                                   
                                               // nothing will happen bcus we havent hooked up our application to use this router ,our server doesnot know that  this router exists
                                               // to resolve this we are going to require the file we created 
                                                 //  code  in server.js -> const indexRouter = require('./routes/index') -> now we have reference to this index router we created
                                                 // now we can tell our app to use that -> app.use('/',indexRouter) // '/' tells which route to handle and indexRouter defines this will handle this route request 
                                                
                                                 // after this on running still error will come "waiting for file changes" bcus applicatio does not know how to get any information from this index file
 module.exports = router                         // to resolve this we export information from index.js -> module.exports = router
                                                    // whenever we import our file in our application like in server.js where we required it that router variable("indexRouter" in server.js) will be set to this router variable (in index.js )  
                                                
