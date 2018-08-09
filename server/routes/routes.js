//server/routes/routes.js
var express = require('express');
var bodyParser = require('body-parser');
var Item = require('../../models/Item');

var router = express.Router();
router.get('/', function(req, res){
  res.render('index')
});


router.route('/insert')
.post(function(req,res) {
 var item = new Item();
  item.name = req.body.name;
  item.quantity = req.body.quantity;
item.save(function(err) {
      if (err)
        res.send(err);
      res.send('Item successfully added!');
  });
})
router.route('/update')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     quantity: req.body.quantity
 };
 console.log(doc);
  Item.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Item successfully updated!');
  });
});
router.get('/delete', function(req, res){
 var id = req.query.id;
 Item.find({_id: id}).remove().exec(function(err, item) {
  if(err)
   res.send(err)
  res.send('Item successfully deleted!');
 })
});
router.get('/getAll',function(req, res) {
 // var nameRec = req.query.name;
 // var quantityRec = req.query.quantity;
 // if(nameRec && nameRec != 'All'){
 //  Item.find({$and: [ {name: nameRec}, {quantity: quantityRec}]}, function(err, items) {
 //   if (err)
 //    res.send(err);
 //   res.json(items);
 //  });
 // } else {
   // Item.find({quantity: quantityRec}, function(err, items) {
   Item.find({}, function(err, items) {
     if (err)
       res.send(err);
     res.json(items);
   });
// }
});

module.exports = router;
