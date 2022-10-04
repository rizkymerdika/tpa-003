// const API_KEY = 'ab9d71c40691497499ff3508c6ec7c5e'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?api_key=ab9d71c40691497499ff3508c6ec7c5e&sort_by=popularity.desc&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchURL = BASE_URL + '/search/movie?api_key=ab9d71c40691497499ff3508c6ec7c5e&page=1'

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="date">
                <span class="date-detail">${release_date}</span>
            </div>
        `
        main.appendChild(movieElement)
    });
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const searchTerm = search.value

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL)
    }
})