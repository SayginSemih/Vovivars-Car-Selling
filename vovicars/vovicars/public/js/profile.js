let search = document.querySelector("#search-button");
let src=document.querySelector(".searchForm");

search.addEventListener("click",() => {
    src.submit();
});