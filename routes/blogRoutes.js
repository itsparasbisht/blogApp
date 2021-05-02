const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

router.post('', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then((result) => {
        res.redirect('/')
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => {
        res.render('details', {title: 'blog details', blog: result})
    })
    .catch(error => {
        res.status(404).render('404', {title: '404: error'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/'})
    })
    .catch(error => {console.log(error)})
})

module.exports = router