const gamelist = document.getElementById("gamelist")

fetchgames()
async function fetchgames() {
  try {
    let response = await fetch('/fetchgames')
    let data = await response.json()

    displaygames(data)

  } catch (error) {
    console.log("Error:", error)
  }
}

function displaygames(data) {
  for (var i = 0; i < data.length; i++) {
    gamelist.innerHTML += `<a href="./games/${data[i].name}/">${data[i].name}</a> <br />`
  }
}
