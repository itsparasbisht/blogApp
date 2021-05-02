const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// connection to the database
const dbURI = 'mongodb+srv://paras:n&m1221n&m@cluster0.f1mi8.mongodb.net/blogapp?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((error) => console.log(error))

// setting view engine
app.set('view engine', 'ejs')

// setting public folder
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

// handling requests
app.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'home', blogs: result})
    })
    .catch((error) => console.log(error))
})

// blog routes

// scoping all blogRoutes to /blogs
app.use('/blogs', blogRoutes)

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'})
})

app.get('/add-blog', (req, res) => {
    res.render('add-blog', {title: 'add blog'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404: error'})
})