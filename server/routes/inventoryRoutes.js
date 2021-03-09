const express = require("express");
const router = express.Router();

const InvItems = require("../models/InventoryItems");
const ShopItems = require("../models/ShopItems");


// Get Inventory/Shopping list data
router.get('/inventory', (req, res) => {
  InvItems.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error");
    });
});

router.get('/shoplistitems', (req, res) => {
  ShopItems.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error");
    });
});

// Submit data
router.post('/inventory', (req, res) => {

  // content to send to database
  const data = req.body;

  const newItem = new InvItems(data);

  // save
  newItem.save((error) => {

    if (error) {
      res.status(500).json(data);
      return;
    }

    res.json({
      msg: "Data received"
    })

  })
});

router.post('/shoplistitems', (req, res) => {

  // content to send to database
  const data = req.body;

  const newShoppingItem = new ShopItems(data);

  // save
  newShoppingItem.save((error) => {

    if (error) {
      res.status(500).json(data);
      return;
    }
    res.json({ msg: "Data received" })
  })
});

// Deleting inventory and shopping list data
router.delete('/inventory/delete/:id', function (req, res, next) {
  InvItems.findByIdAndRemove(req.params.id, req.body, function (err, post, next) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

router.delete('/shoplistitems/delete/:id', function (req, res, next) {
  ShopItems.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

// Edit Inventory and Shopping list
router.put('/inventory/edit/:id', (req, res) => {
  InvItems.findByIdAndUpdate(req.params.id, req.body, function (err, post, next) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

router.put('/shoplistitems/edit/:id', (req, res) => {
  ShopItems.findByIdAndUpdate(req.params.id, req.body, function (err, post, next) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});


module.exports = router;