const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));

const path = './cache/';

app.post('/save-cache', (req, res) => {
    const response = req.body;
    const fileName = response.fileName;
    try{
      fs.writeFileSync(`${path}${fileName}.json`, JSON.stringify(response.data),'utf8');
      res.send(
        {
          status: 'saved',
          isSaved: true,
          context: `File was saved at ${path} as ${fileName}`
        }
      );
    }catch (e){
      console.log('error',e);
      res.send(
        {
          status: 'error',
          isSaved: false,
          context: e,
        }
      );
    }
});

app.get('/get-cache/:filename', (req, res) => {
  const fileName = req.params.filename;
  const data = JSON.parse(fs.readFileSync(`${path}${fileName}.json`, 'utf8'));
  res.json(data);
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
