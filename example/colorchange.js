const colors = [
  "celeste",
  "baby-powder",
  "muave",
  "lemon-yellow",
  "tea-green",
  "baby-blue",
  "purple-blue",
];
const colorsHex = [
  "#5a189a",
  "bdb2ff",
  "#caffbf",
  "#ffc6ff",
  "#ffb703",
  "#cafcf1",
  "#ff006e",
  "#eaf2ef",
];
const pElements = Array.from(document.querySelectorAll(".offer-text"));
const img = document.querySelector(".iphone-img");

function randomColor(isHex = false) {
  const len = isHex ? colorsHex.length : colors.length;
  const randIndex = Math.floor(Math.random() * len);
  return isHex ? colorsHex[randIndex] : colors[randIndex];
}

function animateOpacity(ele) {
  var increment = 0.3;
  var opacity = 0;
  var instance = window.setInterval(function () {
    ele.style.opacity = opacity;
    opacity = opacity + increment;
    if (opacity > 1) {
      window.clearInterval(instance);
    }
  }, 100);
}

let item = 0;
document
  .querySelector(".page-container")
  .addEventListener("click", function () {
    // pElements.forEach((ele) => {
    //   ele.className = "";
    //   ele.classList.add("offer-text", randomColor());
    //   animateOpacity(ele);
    //   //   animateOpacity(img);
    // });
    if (item === 3) {
      img.querySelector(".img-ele").style.borderColor = randomColor(true);
      animateOpacity(img);
      item++;
      return;
    }
    if (item > 3) item = 0;
    const ele = pElements[item];
    ele.className = "";
    ele.classList.add("offer-text", randomColor());
    animateOpacity(ele);
    item++;
  });
