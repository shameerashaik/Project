const express = require('express');
const app = express();  
const multer = require('multer');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, 'uploads');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

});

const uploadFiles = multer({ 
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
}); 


app.post("/submit", uploadFiles.array("file"), (request, response) => {
  const name = request.body.name;
  const age = request.body.age;
  const height = request.body.height;
  const weight = request.body.weight;
  const file = request.files[0];

  console.log('Name:', name);
  console.log('Age:', age);
  console.log('Height:', height);
  console.log('Weight:', weight);

  console.log('File:', file);

  response.send("Files uploaded successfully");
});



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
