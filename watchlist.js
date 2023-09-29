const watchlistContainer = document.getElementById("main-container")

renderMovies()

function renderMovies() { 

  let watchlist = setget('watchlistItems')

    if(watchlist && watchlist.length > 0) {
        watchlistContainer.innerHTML = ``
        watchlistOrder = {}
        for (index in watchlist) {
            watchlistOrder[watchlist[index]] = index
            var extraData = fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${watchlist[index]}`)
            .then(response => response.json())
            .then(data => {
                console.log(watchlistOrder);
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
                                        <div class="watchlist-Btn" onClick="removeItem('watchlistItems', ${watchlistOrder[data.imdbID]})">Remove from Watchlist</div>
                                </div>
                            <div class="Movie-desc">
                                <p id="plot">${data.Plot}</p>
                            </div>
                        </div>
                    </div> `
                watchlistContainer.innerHTML += temp
        });
        }
    }
}

function removeItem(name, index) {
    database = localStorage.getItem("database")
    console.log('REMOVE ITEM: ', index);
    if (database) {
        database = JSON.parse(database)
        if (index > -1) {
            database[name].splice(index, 1)

        } else {
            delete database[name]
        }
    }
    localStorage.setItem("database", JSON.stringify(database))
}

function setEventListeners() {
    const watchlistContainers = document.getElementsByClassName("watchlist")
    
    Object.values(watchlistContainers).forEach( function(item, index) {
        // Add event listener
        item.addEventListener("click", function() {
            // remove from array
            watchlistLocalStorage.splice(watchlistLocalStorage[index], 1) 
            // save to local storage
            localStorage.setItem("myMovieWatchlist", JSON.stringify(watchlistLocalStorage)) 
            setEventListeners()
            renderMovies()
            // console.log("Removed from watchlist!")            
        })
    })
}
