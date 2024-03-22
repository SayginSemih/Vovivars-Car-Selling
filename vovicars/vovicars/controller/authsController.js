const db = require("./db");

const register = async (username, passwd) => {
    await db.connect(async () => {
        try
        {	
            let email = "Girilmemiş";
            let VIP = 0;
            let active_advert = 0;
            let firstname = "Girilmemiş";
            let lastname = "Girilmemiş";
            let register_date = new Date();
            const insertQuery = 'INSERT INTO users (username,passwd,email,VIP,active_advert,firstname,lastname,register_date) VALUES (?,?,?,?,?,?,?,?)';
            const [rows, fields] = await db.promise().query(insertQuery, [username, passwd, email, VIP, active_advert, firstname, lastname, register_date])
            .then( row => {
                console.log("Veritabanına kayıt başarıyla tamamlandı!")
            })
            .catch();
        }
        catch(err)
        {
            console.log("HATA : " + err)
        }  
    })
}

module.exports = register