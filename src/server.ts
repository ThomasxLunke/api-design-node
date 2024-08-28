import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { signin, signup } from './handlers/user'


const app = express()

// midleware that console.log the request done to the terminal
app.use(morgan('dev'))

// authorize client to send to the server .json
app.use(express.json())

// allow a client to add thing like query string and parameters
// and it decods and encodes properly
// if you don't do it kind of treating everything like a string
// EX : google.com?a=1,thing=otherthing  
// "urlencoded" gonna convert "a=1,thing=otherthing" in object for us
app.use(express.urlencoded({extended:true}))

// attach router to the server :
  // - with the prefix /api to hit the router
  // - with the middleware protect in between
  // - with the router at the end
app.use('/api', protect ,router)

app.post('/user', signup)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === "auth"){
    res.status(401).json({message: "unauthorized"})
  } 
  else if (err.type === "input") {
    res.status(400).json({message: "invalid input"})
  }
  else {
    res.status(500).json({message: "internal server error"})
  }
})


export default app