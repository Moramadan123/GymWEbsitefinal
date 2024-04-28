// the log in page //////////////////////
let logpage = document.querySelector(".logpage");
let ul = document.querySelector(".logpage ul");
let form = document.querySelector(".logpage form");
let input = document.querySelector(".logpage input");
let info = document.querySelector(".info");
let newclient = document.querySelector(".logpage .new-client");
let button1 = document.querySelector(".logpage button");
let enrollment = document.querySelector(".enrollment");

button1.addEventListener("click", function () {
  info.innerHTML = `welcome  ${input.value} to Our website`;
  mainspan = document.createElement("span");
  mainspntext = document.createTextNode("");

  ul.className = "on";
});
newclient.addEventListener("click", function () {
  enrollment.className = "on";
});
console.log(enrollment);
