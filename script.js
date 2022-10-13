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
        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie
        let bulan = ''
        let newDate = ''
        function changeDate() {
            for(let i = 5; i <= 6; i++){
                bulan += release_date[i]
            }
            switch (bulan) {
                case '01':
                    bulan = 'Jan'
                    break;
                case '02':
                    bulan = 'Feb'
                    break;
                case '03':
                    bulan = 'Mar'
                    break;
                case '04':
                    bulan = 'Apr'
                    break;
                case '05':
                    bulan = 'May'
                    break;
                case '06':
                    bulan = 'Jun'
                    break;
                case '07':
                    bulan = 'Jul'
                    break;
                case '08':
                    bulan = 'Aug'
                    break;
                case '09':
                    bulan = 'Sep'
                    break;
                case '10':
                    bulan = 'Oct'
                    break;
                case '11':
                    bulan = 'Nov'
                    break;
                case '12':
                    bulan = 'Dec'
                    break;
                default:
                    break;
            }
            newDate += bulan + ' '
            for(let i = 8; i<=9; i++){
                newDate += release_date[i]
            }
            newDate += ',' + ' '
            for(let i = 0; i<=3; i++){
                newDate += release_date[i]
            }
            return newDate
        }
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h4>${title}</h4>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="date">
                <span class="date-detail">${changeDate()}</span>
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