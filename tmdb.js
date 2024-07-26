const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGQ3NmMyZWMyNDczMjQ3YTgzNDJkZWNjMTBhZjUwZCIsIm5iZiI6MTcyMTk3NDc5Ny41NjczNDgsInN1YiI6IjY2YTMzZTMzOTk0NjYzMTFkNDQ2OTk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IOR-jc_4mtBubwghTXcPtULLAVvtc56HDQqDctLDSVM'
    }
  };

  document.addEventListener("click", (e) => {
    if(e.target.dataset.type === "btn") {
        fetchTrailer(e.target.dataset.key)
    }
})

const hideTrailer = () => {
    document.getElementById("trailer-view").innerHTML = ""
}

const fetchTrailer = async (trailerId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`, options)
    const trailerData = await response.json()
    const trailer = trailerData.results.filter(t => {
        return t.type === "Trailer"
    })
    const youtubeVideoId = trailer[0].key;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&rel=0&modestbranding=1&controls=0&showinfo=0`;

                document.getElementById('trailer-view').innerHTML = `<iframe width="560" height="315" src="${youtubeEmbedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

const fetchMovies = async () => {
try {
    const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
    const movies = await response.json()
    const a = movies.results.map(movie => (
        `
        <div style="border: 1px solid black; padding:1rem; width:200px;">
            <p>${movie.title}</p>
            <img style="width:100%;" src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}" />
            <button data-type="btn" data-key=${movie.id}>See Trailer</button>
            <button onclick="hideTrailer()">Hide Trailer</button>
        </div>
        `
        )).join("")
        document.getElementById("root").innerHTML = a
} catch (error) {
    const html = `<h1>TMDB API Don't Work</h1>`
    document.getElementById("root").innerHTML = html
}
}

fetchMovies()