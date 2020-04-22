var main = document.getElementById("gameCards");
main.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  console.log(event);
  var target = event.target;
  target.classList.add("hidden")
}
