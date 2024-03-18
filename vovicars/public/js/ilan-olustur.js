let cb = document.querySelectorAll(".form-select");
let fc = document.querySelectorAll("#form-control");
let frm = document.querySelector(".searchForm");
let search = document.querySelector("#search-button");

search.addEventListener("click",() => {
    search.disabled=false;
    frm.submit();
});

let btn = document.querySelector("#gonder");

btn.addEventListener("click", () => {
    let control=false;
    cb.forEach((c) => {
        if (c.value=="Lütfen bir marka seçiniz." ||
        c.value=="Lütfen bir yakıt türü seçiniz." ||
        c.value=="Lütfen bir vites türü seçiniz." ||
        c.value=="Lütfen bir araç durumu türü seçiniz." ||
        c.value=="Lütfen bir kasa tipi türü seçiniz." ||
        c.value=="Lütfen bir çekiş türü seçiniz." ||
        c.value=="Lütfen bir garanti durumu seçiniz." ||
        c.value=="Lütfen bir ağır hasar kaydı durumu belirtiniz."
        ){
            control=true;
        }
    });
    fc.forEach((f) => {
        if (f.value==""
        ){
            control=true;
        }
    });
    if (control)
    {
        alert("Bazı alanlar boş geçilemez!")
    }
    else
    {
        if (cb[1].value=="" || cb[1].value=="Lütfen bir model seçiniz.")
            cb[1].value="-"
        if (cb[2].value=="" || cb[2].value=="Lütfen bir seri seçiniz.")
            cb[2].value="-"
        formSubmit();
    }
})

function formSubmit() { 
        let sum = document.getElementById("myForm");
        sum.submit();
}  