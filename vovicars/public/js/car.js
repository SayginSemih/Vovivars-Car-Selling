//----------------------------------------------------------
// FOTO BÜYÜTME
let car_image = document.querySelector(".car-image");
let wrapper = document.querySelector(".ilan-wrapper");

wrapper.addEventListener("click", (e) => {
    if (e.target.className=="other-image")
    {
        car_image.src=e.target.src
    }
});
//----------------------------------------------------------
