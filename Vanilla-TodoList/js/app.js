window.addEventListener("DOMContentLoaded", () => {
  console.log("ready");
});

const submitBtn = document.querySelector(".input-btn");
submitBtn.addEventListener("click", function (e) {
  // e.preventDefault();
});

const inputDate = document.querySelector(".input-date");
inputDate.setAttribute("value", new Date().toISOString().slice(0, 10));
