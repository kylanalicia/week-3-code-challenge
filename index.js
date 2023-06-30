document.addEventListener("DOMContentLoaded", () => {
    const moviesListContainer = document.querySelector("#moviesList");
    const moviesDetailsContainer = document.querySelector("#movieDetails");
  
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        displayMoviesList(data.films);
      });
  
    function displayMoviesList(data) {
      data.map((movie) => {
        const markUp = `<li class="list-group-item" id="moviesList">${movie.title}</li>`;
        moviesListContainer.insertAdjacentHTML("afterbegin", markUp);
  
        const moviesList = document.querySelector("#moviesList");
        moviesList.addEventListener("click", () => {
          displayMoviesDetails(movie);
        });
      });
    }
  
    function displayMoviesDetails(movie) {
      const markUp = `
        <img src="${movie.poster}" alt="">
        <div class="Ola">
          <h2 id="movieTitle" class="customtitles">${movie.title}</h2>
          <p>${movie.description}</p>
          <p>${movie.showtime}</p>
          <p>${movie.capacity}</p>
          <p>${movie.tickets_sold}</p>
          <p>${movie.availableTickets}</p>
          <button class="custombtn" id="buyTicket">Buy Ticket</button>
        </div>`;
  
      moviesDetailsContainer.innerHTML = "";
      moviesDetailsContainer.insertAdjacentHTML("afterbegin", markUp);
  
      const btn = moviesDetailsContainer.querySelector("button");
      btn.addEventListener("click", () => {
        buyTicket(movie);
      });
    }
  
    function buyTicket(movie) {
      const ticketsSold = document.querySelector("#ticketsSold");
      let remainingTickets = movie.capacity - movie.tickets_sold;
      const btn = moviesDetailsContainer.querySelector("button");
      const availableTickets = document.querySelector("#availableTickets");
  
      if (remainingTickets > 0) {
        movie.tickets_sold++;
        remainingTickets--;
        btn.innerHTML = "Buy Ticket";
      } else {
        btn.innerHTML = "Sold Out";
        btn.classList.add("soldOut");
      }
      ticketsSold.innerHTML = `Tickets sold: <span>${movie.tickets_sold}</span>`;
      availableTickets.innerHTML = `Available tickets: <span>${remainingTickets}</span>`;
    }
  });
  