function moviesPage() {
    const movies = document.getElementById("films");
    const searchBtn = document.getElementById("Search");

searchBtn.addEventListener("click", function() {
    alert("Button clicked!")
});

    fetch("http://localhost:3000/films")
        .then((response) => response.json())
        .then((data) => createFilmDetails(data.films));

    function createFilmDetails(data) {
        const details = document.getElementById('film-details');

        data.forEach((film) => {
            const movieList = document.createElement("p");
            const pTitle = document.createElement("span");
            pTitle.innerText = film.title;
            movieList.appendChild(pTitle);
            movies.appendChild(movieList);

            movieList.addEventListener("click", () => {
                details.innerHTML = "";
                displayFilmDetails(film, details);
            });
        });
    }

    function displayFilmDetails(film, details) {
        const title = document.createElement("h1");
        title.innerText = film.title;
        details.appendChild(title);

        const runtime = document.createElement("p");
        runtime.innerHTML = `<b>Run Time:</b> ${film.runtime}`;
        details.appendChild(runtime);

        const poster = document.createElement("img");
        poster.src = film.poster;
        details.appendChild(poster);

        const showtime = document.createElement("p");
        showtime.innerHTML = `<b>Show time:</b> ${film.showtime}<br><b>Available Tickets</b>`;
        details.appendChild(showtime);

        const description = document.createElement("p");
        description.innerText = film.description;
        details.appendChild(description);

        const capacity = film.capacity;
        const ticketsSold = film.tickets_sold;
        const availableTickets = capacity - ticketsSold;

        const ticketsAvailable = document.createElement("p");
        ticketsAvailable.innerHTML = `<span style="color:#0080ff;">${availableTickets} Available</span>`;
        
        const buyTicketBtn = document.createElement("button");
        buyTicketBtn.textContent = `Buy ${availableTickets} Ticket(s)`;
        buyTicketBtn.className = 'custombtn';
        buyTicketBtn.style.marginTop = '1rem';

        buyTicketBtn.addEventListener("click", () => {
            buyTicket(film._id);
        });

        details.appendChild(ticketsAvailable);
        details.appendChild(buyTicketBtn);
    }

    function buyTicket(movieId) {
        if (!loggedInUser) {
            alert('Please login to purchase a ticket');
            return false;
        }

        fetch(`/api/users/${userId}/purchase-ticket`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "movieId": movieId })
        })
            .then((res) => res.json())
            .catch(() => console.error('Error'))
            .finally(() => {
                window.location.reload();
            });
    }

    document.addEventListener("DOMContentLoaded", moviesPage);
}
