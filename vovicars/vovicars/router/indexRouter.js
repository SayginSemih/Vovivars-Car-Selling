const express = require("express")
const app = express();
const router = express.Router();
const session = require("express-session");
var bodyParser = require('body-parser');
const multer  = require('multer');
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

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Dosyaların yükleneceği klasörleri belirle
      if (file.fieldname === 'kucukresim') {
        cb(null, 'uploads/kucukresimler/')
      } else if (file.fieldname === 'resimler') {
        cb(null, 'uploads/resimler/')
      } else {
        cb({ message: 'Bilinmeyen dosya alanı' }, false);
      }
    },
    filename: function (req, file, cb) {
      // Dosya adını belirleme (örneğin, orijinal adıyla)
      cb(null, req.session.token + "-" + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  router.get("/cars/:id", async (req, res) => {
    const id=req.params.id
    const token = tokenController(req)
    var image=[];
    if (token)
        db.query("SELECT * FROM ilanlar WHERE id=?", [id], (err, r) => {
      try
      {
        image = String(r[0].resimler)
        var resimler_ = image.split("*");
        res.render("car", {
            car: r[0],
            images: resimler_,
            name: req.session.token
        })
      }
      catch
      {
        res.send("<h1>Bulunamadı!</h1>");
      }
    });
    else
    {
        res.redirect("../user/login");
    }
  });

router.get("/arac-filtreleme", async (req, res) => {
      const token = tokenController(req)
      if (token)
      {
        res.render("arac-filtreleme", {
        name: req.session.token 
      });
      }
      else
      {
        res.render("arac-filtreleme", {
          name: false
        });
      }
  });

  router.get("/ilanlarim", async (req, res) => {
    const token = tokenController(req)
    if (token)
    {
      db.query("SELECT * FROM ilanlar WHERE satici=?", [req.session.token], (err, ilan) => {
        res.render("ilanlar", {
          ilan,
          name: req.session.token 
        });
      })
    }
    else
    {
      res.redirect("./user/login");
    }
});

router.post("/ilanlarim", urlencodedParser,async (req, res) => {
  var ilanid=req.body.ilan_id;
  const token = tokenController(req)
  if (token)
  {
    db.query("DELETE FROM ilanlar WHERE ID=?", [ilanid], (err, dlt) => {
      db.query("SELECT * FROM ilanlar WHERE satici=?", [req.session.token], (error_, ilan) => {
        res.render("ilanlar", {
          name: req.session.token,
          ilan
        })
      })
    })
  }
  else
  {
    res.redirect("./user/login");
  }
});

  router.post("/arac-filtreleme", urlencodedParser, async (req, res) => {
      var username = req.session.token
      var aracmarka = req.body.aracmarka
      var aracmodel= req.body.aracmodel
      if (aracmodel==null)
      {
          aracmodel="Girilmemiş";
      }
      var aracseri = req.body.aracseri
      if (aracseri==null)
      {
          aracseri="Girilmemiş";
      }
      let sql = "SELECT * FROM ilanlar WHERE marka LIKE '%" + aracmarka + "%' AND model LIKE  '%" + aracmodel + "%' AND seri LIKE '%" + aracseri + "%'"
      db.query(sql, (err, r) => {
        if (err) throw err;
        if (r.length>0){
          if (req.session.token)
          {
            res.render("filter", {
              cars: r,
              name: req.session.token
            })
          }
          else
          {
            res.render("filter", {
              cars: r,
              name: false
            })
          }
        }
      })
  });



router.get("/yeni-ilan", async (req, res) => {
    const token = tokenController(req)
    if (token)
        res.render("ilan-olustur", {
        name: req.session.token})
    else
    {
        res.redirect("user/login")
    }
  });

  router.post("/yeni-ilan", upload.fields([
    { name: 'kucukresim', maxCount: 1 },
    { name: 'resimler', maxCount: 10 }
  ]), urlencodedParser ,async (req, res) => {
    var username = req.session.token
    var aracmarka = null ? "-" : req.body.aracmarka
    var aracmodel= req.body.aracmodel
    if (aracmodel==null)
    {
        aracmodel="Girilmemiş";
    }
    var aracseri = req.body.aracseri
    if (aracseri==null)
    {
        aracseri="Girilmemiş";
    }
    var date__=new Date();
    var date_= date__.getDay() + "/" + date__.getMonth() + "/" + date__.getFullYear();
    var aracyakit=req.body.aracyakit
    var aracvitesturu=req.body.aracvitesturu
    var aracdurumturu=req.body.aracdurumturu
    var arackasatipi=req.body.arackasatipi
    var araccekisturu=req.body.araccekisturu
    var aracgarantidurumu=req.body.aracgarantidurumu
    var arachasarkaydi=req.body.arachasarkaydi
    var fiyat=req.body.fiyat
    var yil=req.body.yil
    var km=req.body.km
    var motorgucu=req.body.motorgucu
    var motorhacmi=req.body.motorhacmi
    var renk=req.body.renk
    var plakauyruk=req.body.plakauyruk
    var takas=req.body.takas
    var iletisim=req.body.iletisim
    var baslik=req.body.baslik
    var aciklama=req.body.aciklama
    var kucukresim;
    try
    {
      kucukresim = req.files['kucukresim'][0].filename;
    }
    catch{ return res.render("ilan-olustur", {
      name: req.session.token}) }
    var resimler=[];
    var resim="";
    try
    {
      req.files['resimler'].map(r => {
        resimler.push(r.filename)
    })
    }
    catch{ return res.render("ilan-olustur", {
      name: req.session.token}) }
    for (let i = 0 ; i<=resimler.length ; i++)
    {
        if (i==resimler.length)
        {
            resim+=resimler[i-1];
        }
        else
        {
            resim+=resimler[i] + "*";
        }
    }
    db.query("INSERT INTO ilanlar (satici, iletisim, fiyat, marka, model, seri, yil, yakit, vites, aracdurumu, km, kasatipi, motorgucu, motorhacmi, cekis, renk, garanti, agirhasarkaydi, plakauyruk, takas, aciklama, baslik, tarih ,kucukresim, resimler) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
    [username,iletisim,fiyat,aracmarka,aracmodel,aracseri,yil,aracyakit,aracvitesturu,aracdurumturu,km,arackasatipi,motorgucu,motorhacmi,araccekisturu,renk,aracgarantidurumu,arachasarkaydi,plakauyruk,takas, aciklama, baslik, date_, kucukresim,resim]
    , (err, r) => {
        if (err) throw err;
        console.log("KAYIT BAŞARILI");
        res.redirect("/anasayfa");
    })

  });

router.get("/anasayfa", async (req, res) => {
    var username = req.session.token
    db.query("SELECT * FROM users WHERE username=?", [username], (err, r) => {
        if (err) throw err;
        if (r.length>0)
        {
            db.query("SELECT * FROM ilanlar", (err1, res1) => {
                if (err1) throw err1;
                res.render("anasayfa", {
                    name: username,
                    cars: res1
                })
            })
        }
        else
        {
            db.query("SELECT * FROM ilanlar", (err1, res1) => {
                if (err1) throw err1;
                res.render("anasayfa", {
                    name: false,
                    cars: res1
                })
            })
        }
    })
  });

  router.post("/anasayfa", urlencodedParser ,async (req, res) => {
    var username = req.session.token
    var src = req.body.search
    db.query("SELECT * FROM users WHERE username=?", [username], (err, r) => {
        if (err) throw err;
        if (r.length>0)
        {
            db.query("SELECT * FROM ilanlar WHERE aciklama LIKE '%" + src + "%'", [src],(err1, res1) => {
                if (err1) throw err1;
                res.render("filter", {
                    name: username,
                    cars: res1
                })
            })
        }
        else
        {
            db.query("SELECT * FROM ilanlar WHERE aciklama LIKE '%" + src + "%'", [src] ,(err1, res1) => {
                if (err1) throw err1;
                  res.render("filter", {
                    name: false,
                    cars: res1
                })
            })
        }
    })
  });

module.exports = router