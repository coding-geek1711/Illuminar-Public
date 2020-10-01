const signin = document.getElementById("Login");
const signup = document.getElementById("Signup");
const btn = document.getElementById("button");
const flashMessage = document.querySelector(".alert");

// window.addEventListener("click", (event) => {
// if (flashMessage !== null) {
//   setTimeout(() => {
//     flashMessage.style.display = "none";
//   }, 1000);
//   console.log("doNE");
// }
// });

window.addEventListener("mousemove", (event) => {
  if (flashMessage !== null) {
    setTimeout(() => {
      flashMessage.style.display = "none";
    }, 1000);
  }
});

function login() {
  signin.style.display = "";
  signup.style.display = "none";
  signin.style.transitionDelay = "fadeOut";
  btn.style.left = "0px";
}

function register() {
  signin.style.display = "none";
  signup.style.display = "";
  signin.style.transitionDelay = "fadeOut";
  btn.style.left = "110px";
}
