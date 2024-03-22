document.querySelector(".tr-wrapper").addEventListener("click", (e) => {
    if (e.target.id=="delete-button")
    {
        let cnf = confirm("Bu ilanı silmek istediğinize emin misiniz?");
        if (cnf==true)
        {
            document.querySelector("#ilan-id").value=e.target.parentElement.parentElement.id;
            document.querySelector("#myForm").submit();
        }
    }
})