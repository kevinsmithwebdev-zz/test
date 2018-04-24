require('dotenv').config()

const express = require('express')
const mysql = require('mysql')

// create db connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PWD,
  database: 'nodemysql'
})
db.connect((err) => {
  if (err)
    throw err
  console.log('MySQL connected.')
})

const app = express()

// create db
app.get('/createdb', (req, res) => {
  const sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if (err)
      throw err
    console.log('db created', result)
    res.send('database created')
  })
})

// create table
app.get('/createposttable', (req, res) => {
  const sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
  db.query(sql,  (err, result) => {
    if (err)
      throw err
    console.log('db post table created', result)
    res.send('db post table created')
  })
})

// add post 1
app.get('/addpost1', (req, res) => {
  const post = {
    title: 'post1',
    body: 'this is post #1'
  }
  const sql = 'INSERT INTO posts SET ?'
  const query = db.query(sql, post, (err, result) => {
    if (err)
      throw err
    console.log('post #1 added', result)
    res.send('post #1 added')
  })
})

// add post 2
app.get('/addpost2', (req, res) => {
  const post = {
    title: 'post2',
    body: 'this is post #2'
  }
  const sql = 'INSERT INTO posts SET ?'
  const query = db.query(sql, post, (err, result) => {
    if (err)
      throw err
    console.log('post #2 added', result)
    res.send('post #2 added')
  })
})

// select posts
app.get('/getposts', (req, res) => {
  const sql = 'SELECT * FROM posts'
  const query = db.query(sql, (err, results) => {
    if (err)
      throw err
    console.log('posts fetched', results)
    res.send('posts fetched')
  })
})

// select post
app.get('/getpost/:id', (req, res) => {
  const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
  const query = db.query(sql, (err, result) => {
    if (err)
      throw err
    console.log('post fetched', result)
    res.send('post fetched')
  })
})

// update post
app.get('/updatepost/:id', (req, res) => {
  const newTitle = 'updated title'
  const sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
  const query = db.query(sql, (err, result) => {
    if (err)
      throw err
    console.log('post updated', result)
    res.send('post updated')
  })
})

// delete post
app.get('/deletepost/:id', (req, res) => {
  const sql = `DELETE FROM posts WHERE id = ${req.params.id}`
  const query = db.query(sql, (err, result) => {
    if (err)
      throw err
    console.log('post deleted', result)
    res.send('post deleted')
  })
})

app.listen(3000, () => console.log('Server running on port 3000.'))
