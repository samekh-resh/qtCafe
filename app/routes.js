const { MongoDBNamespace } = require("mongodb");
const ObjectID = require('mongodb').ObjectID

module.exports = function (app, passport, db, mongodb) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  app.get("/order", function (req, res) {
    res.render("order.ejs");
  });

  app.post("/order", (req, res) => {
    console.log(req.body);
    db.collection("coffeeOrders").insertOne(//method that allows you to insert one, and it won't update the collection
      {
        customerName: req.body.name,
        coffee: req.body.coffee,
        tea: req.body.tea,
        juice: req.body.juice,
        smoothie: req.body.smoothie,
        donuts: req.body.donuts,
        bagel: req.body.bagel,
        scone: req.body.scone,
        muffin: req.body.muffin,
        additives: req.body.additives,

        total: 0,
        // total: req.body.total,
        status: false,
        barista: null
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log(
          `saved to database: ${req.body.customerName} ${req.body.coffeeSmall}`
        );
        res.redirect("/order");
      }
    );
  });

  // app.get('/completedOrders', isLoggedIn, function (req, res) {
  //   db.collection('messages').find().toArray((err, result) => {

  //     if (err) return console.log(err)
  //     res.render('completedOrders.ejs', {
  //       user: req.user,
  //       messages: result
  //     }) //put this in a different get request for a different ejs page that monitors the emotion
  //   })
  // });

  //page of completed orders
  app.get("/completedOrders", isLoggedIn, function (req, res) {
    db.collection("coffeeOrders")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("completedOrders.ejs", {
          user: req.user,
          coffeeOrders: result,
        });
      });
  });

  // PROFILE SECTION =========================
  app.get("/profile", isLoggedIn, function (req, res) {
    db.collection("coffeeOrders")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          coffeeOrders: result,
        });
      });
  });

  //get the completed orders selection. 
  app.get("/completedOrders", isLoggedIn, function (req, res) {
    db.collection("coffeeOrders")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("completedOrders.ejs", {
          user: req.user,
          coffeeOrders: result,
        });
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // message board routes ===============================================================

  app.put("/coffeeOrders", isLoggedIn, (req, res) => {

    console.log(req.body);
    db.collection("coffeeOrders").findOneAndUpdate(
      { _id: mongodb.ObjectId(req.body.id)}, {
      $set: {
        status: true,
        barista: req.user.local.email
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    }
    );
  });

  app.delete("/deleteOrder", isLoggedIn, (req, res) => {
    db.collection("coffeeOrders").findOneAndDelete(
      { _id: ObjectID(req.body.id)},
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
