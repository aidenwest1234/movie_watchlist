let movieId = ""
const searchButton = document.getElementById("search-button")
const userInput = document.getElementById("search-input")
const apiKey = "72aa78df"

function searchMovie() {
  if (searchButton) {
    searchButton.addEventListener("click", () => {
    })
  }

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${userInput.value}`)
  .then(response => response.json())
  .then(data => {
    var radr = JSON.stringify(data)
    var item_list = ''
    if (data.Search.length > 0) {
       document.getElementsByClassName('resultsContainer')[0].innerHTML = ''
    }

    for (index in data.Search) {
      var extraData = fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${data.Search[index].imdbID}`)
      .then(response => response.json())
      .then(data => {
        var temp = `
        <div class="divider">
          <hr>
        </div>
          <div class="Card">
                <img id="poster" src='${data.Poster}'>

                <div class="Card-text">
                    <div class="Card-header">
                        <h1 id="Title">${data.Title}</h1>
                        <p id="ratings">${data.Ratings[0].Value}</p>
                    </div>
                        <div class="Card-details">
                              <p id="runtime">${data.Runtime}</p>
                              <p id="year">${data.Year}</p>
                              <p id="rated">${data.Rated}</p>
                              <p id="genre">${data.Genre}</p>
                              <div class="watchlist-Btn" onClick="setget('watchlistItems', '${data.imdbID}')">Add to Watchlist</div>

                        </div>
                    <div class="Movie-desc">
                        <p id="plot">${data.Plot}</p>
                    </div>
                </div>
          </div> `

        document.getElementsByClassName('resultsContainer')[0].innerHTML += temp
    });


    }
      
 });
}

function setget(name, data=null) {
  database = localStorage.getItem("database")
  if (database) {
    database = JSON.parse(database)
    if (data) {
      // console.log('Type of data: ', typeof(database[name]))
      if ((typeof(database[name]) === 'object') || (typeof(database[name]) === 'list')) {
        if (data.length > 0) {
          database[name].push(data)
        }
        
      } else {
        database[name] = data
      }
      localStorage.setItem("database", JSON.stringify(database))
    } else {
      return database[name]
    }
  } else {
    database = {}
    database[name] = data
    localStorage.setItem("database", JSON.stringify(database))
  }
}

setget('watchlistItems', [])












