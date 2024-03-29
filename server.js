const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) =>{
    if(err)
    {
      console.log('Unable to append server.log');
    }
  });
  next();
})

/*app.use((req,res,next)=>{
  res.render('maintenance.hbs');
})
*/hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' ,(text) =>{
  return text.toUpperCase();
})

app.get('/',(req, res) =>{
  res.render('home.hbs',{
    pageTitle : 'Title of page',
    welcomemessage : 'Welcome to my website'
  })
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle : 'Title of page',
  });
})

app.get('/bad',(req,res) =>{
  res.send({
    errormessage : 'Loading in error message'
  })
})
app.listen(port, () =>{
  console.log(`web page is running on port no ${port}`);
});
