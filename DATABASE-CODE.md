CREATE DATABASE vovicars;

use vovicars;
CREATE TABLE users( 
    ID INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    passwd VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    VIP bit NOT NULL,
    active_advert INT NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    register_date DATE NOT NULL
);

use vovicars;
CREATE TABLE ilanlar (ID INT PRIMARY KEY AUTO_INCREMENT,
                      satici VARCHAR(255) NOT NULL,
                      iletisim VARCHAR(255) NOT NULL,
                      fiyat VARCHAR(255) NOT NULL,
                      marka VARCHAR(255) NOT NULL,
                      model VARCHAR(255) NOT NULL,
                      seri VARCHAR(255) NOT NULL,
                      yil VARCHAR(255) NOT NULL,
                      yakit VARCHAR(255) NOT NULL,
                      vites VARCHAR(255) NOT NULL,
                      aracdurumu VARCHAR(255) NOT NULL,
                      km VARCHAR(255) NOT NULL,
                      kasatipi VARCHAR(255) NOT NULL,
                      motorgucu VARCHAR(255) NOT NULL,
                      motorhacmi VARCHAR(255) NOT NULL,
                      cekis VARCHAR(255) NOT NULL,
                      renk VARCHAR(255) NOT NULL,
                      garanti VARCHAR(255) NOT NULL,
                      agirhasarkaydi VARCHAR(255) NOT NULL,
                      plakauyruk VARCHAR(255) NOT NULL,
                      takas VARCHAR(255) NOT NULL,
                      aciklama VARCHAR(1000) NOT NULL,
                      baslik VARCHAR(100) NOT NULL,
                      tarih VARCHAR(255) NOT NULL,
                      kucukresim VARCHAR(255) NOT NULL,
                      resimler VARCHAR(9999) NOT NULL);


