let btn = document.getElementById("darkmode");
let darkmode = localStorage.getItem("darkmode");

if (darkmode === "true"){
    document.body.setAttribute("data-darkmode", "true");
} else {
    document.body.setAttribute("data-darkmode", "");
}

btn.addEventListener("click", e => {
    let attr = document.body.getAttribute("data-darkmode");
    if (attr === "true"){
        document.body.setAttribute("data-darkmode", "");
        localStorage.setItem("darkmode", "");
    } else {
        document.body.setAttribute("data-darkmode", "true");
        localStorage.setItem("darkmode", "true");
    }
});

let sunRays = btn.querySelectorAll("rect");

for (let i = 0; i < sunRays.length; i++){
    let sunRay = sunRays[i];
    sunRay.style.setProperty("--angle", `${i * 360/sunRays.length}deg`);
}