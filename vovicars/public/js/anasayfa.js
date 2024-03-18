let car = document.querySelector(".cars-wrapper");
let search = document.querySelector("#search-button");
let src=document.querySelector(".searchForm");

car.addEventListener("click", (e) => {
    if (e.target.className=="car-image" || (e.target.className=="car-title"))
    {
        window.location.href = `./cars/${e.target.parentElement.id}`;
    }
});

search.addEventListener("click",() => {
    src.submit();
});