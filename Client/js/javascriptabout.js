const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");

p2.style.display = "none";
p3.style.display = "none";

img1.addEventListener("click", (event) => {
  img1.style.filter = "none";
  img2.style.filter = "grayscale(100%)";
  img3.style.filter = "grayscale(100%)";

  p1.style.display = "";
  p2.style.display = "none";
  p3.style.display = "none";
});

img2.addEventListener("click", (event) => {
  img2.style.filter = "none";
  img1.style.filter = "grayscale(100%)";
  img3.style.filter = "grayscale(100%)";

  p2.style.display = "";
  p1.style.display = "none";
  p3.style.display = "none";
});

img3.addEventListener("click", (event) => {
  img3.style.filter = "none";
  img1.style.filter = "grayscale(100%)";
  img2.style.filter = "grayscale(100%)";

  p3.style.display = "";
  p2.style.display = "none";
  p1.style.display = "none";
});
