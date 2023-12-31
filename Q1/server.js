// server.js
const express = require('express');
const { handleChromium } = require('./chromiumHandler');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public')); // Serve static files from the 'public' directory



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/submit', async(req, res) => {
  let name = req.query.name;
  let modifiedName = '';

  for (let i = 0; i < name.length; i++) {
    if (name[i] === '<') {
      modifiedName += '&lt;';
    } else if (name[i] === '>') {
      modifiedName += '&gt;';
    } else {
      modifiedName += name[i];
    }
  }



//browser flag config

  let flag = await handleChromium(modifiedName);
  
if (flag) {
    console.log('Alert triggered! You get a flag!');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purple Cyber</title>
    <link rel="stylesheet" href="/Second/Success/styles.css">
    <link rel="icon" href="/Images/Logo.ico" type="icon">
     
</head>
      <body>
        <div class="container success">
         <input type="text" id="name" name="name" value="${modifiedName}">
          <br>
          <p class="flag">AABUCTF{Y*ay_y:0)u_ma%%de_iX_Xt}</p>
        </div>
      </body>
      </html>
    `);
  } 

else {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Purple Cyber</title>
       <link rel="stylesheet" href="/Second/Failure/styles.css">
       <link rel="icon" href="/Images/Logo.ico" type="icon">
     
     </head>
      <body>
        <div class="container failure">
          <input type="text" id="name" name="name" value="${modifiedName}">
          <br>
            <p class="message">Try again!</p>
        </div>
      </body>
      </html>
    `);
  }
});
//end
 


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

