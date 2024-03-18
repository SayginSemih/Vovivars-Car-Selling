const express = require("express")
const app = express();
const router = express.Router();
const session = require("express-session");
var bodyParser = require('body-parser');
const register = require("../controller/authsController");
const userVerryfield = require("../controller/userVerryfield");
const tokenController = require("../controller/tokenController");
const db = require("../controller/db");

// session middleware
app.use(session({
    secret: 'xASWDCvSW',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// POST islemini cozumlemek icin gerekli bir ayristirici
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/profile/:id", async (req, res) => {
  const token = tokenController(req);
  var username = req.params.id
  if (token){
  await db.connect(async () => {
    await db.promise().query("SELECT * FROM users WHERE username=?", [username])
    .then( q => {
        if (q[0].length>0)
        {
            res.render("profile", {
              ID: q[0][0].ID,
              name: q[0][0].username,
              email: q[0][0].email,
              VIP: q[0][0].VIP,
              active_advert: q[0][0].active_advert,
              firstname: q[0][0].firstname,
              lastname: q[0][0].lastname,
              register_date: q[0][0].register_date
            })
        }
        else
        {
            res.send("<h1>Bu kullanıcı mevcut değil</h1>");
        }})
    .catch( err => {
        console.log("HATA :" + err)
    })
})}
  else
  {
    res.redirect("/user/login");
  }
});

router.get("/user", async (req, res) => {
  const token = tokenController(req);
  var username = req.session.token
  if (token)
  await db.connect(async () => {
    await db.promise().query("SELECT * FROM users WHERE username=?", [username])
    .then( q => {
        if (q[0].length>0)
        {
            res.render("user", {
              ID: q[0][0].ID,
              name: q[0][0].username,
              email: q[0][0].email,
              VIP: q[0][0].VIP,
              active_advert: q[0][0].active_advert,
              firstname: q[0][0].firstname,
              lastname: q[0][0].lastname,
              register_date: q[0][0].register_date
            })
        }
        else
        {
            res.render("login", {
                err_msg: false
            })
        }})
    .catch( err => {
        console.log("HATA :" + err)
    })
})
  else
  {
    res.render("login", {
        err_msg: false
    });
  }
});
  
router.get("/update-user", async (req, res) => {
  const token = tokenController(req)
  var username = req.session.token;
  if (token){

      await db.connect(async () => {
        await db.promise().query("SELECT * FROM users WHERE username=?", [username])
        .then( q => {
            if (q[0].length>0)
            {
                res.render("update-user", {
                  ID: q[0][0].ID,
                  name: q[0][0].username,
                  email: q[0][0].email,
                  VIP: q[0][0].VIP,
                  active_advert: q[0][0].active_advert,
                  firstname: q[0][0].firstname,
                  lastname: q[0][0].lastname,
                  register_date: q[0][0].register_date
                })
            }
            else
            {
                res.render("login", {
                    err_msg: false
                })
            }})
        .catch( err => {
            console.log("HATA :" + err)
        })
    })}
  else
  {
      res.redirect("/user/login");
  }
});

router.post("/update-user", urlencodedParser, (req, res) => {
    var username = req.session.token
    var email = req.body.email
    var passwd = req.body.passwd
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    db.query("UPDATE users SET email=?, passwd=?, firstname=?, lastname=? WHERE username=?", [email, passwd, firstname, lastname, username], (err, res) => {
      if (err) throw err;
    })
})

module.exports = router