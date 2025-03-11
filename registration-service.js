const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const UserSchema = require('./userModel.js');

app.post('/reg', (req, res) => {
  
  const userobj = new UserSchema({
    
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });//CLOSE StuModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  userobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in user Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

app.listen(5000, () => console.log('EXPRESS Server Started at Port No: 5000'));