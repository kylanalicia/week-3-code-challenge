// Function to render movie data in HTML
function renderData(element) {
  const display = document.createElement("div");
  display.className = "justData";
  display.innerHTML = `
    <img src="${element.poster}">
    <p>${element.tickets_sold}</p>
    <button id="ticketsBtn" class="ui blue button">GET YOUR TICKETS NOW!!</button>
  `;
  document.querySelector(".details").appendChild(display);
  console.log(display);

  // Event listener for ticket button click
  display.querySelector("#ticketsBtn").addEventListener("click", () => {
    element.tickets_sold += 1;
    element.capacity -= 1;
    display.querySelector("p").textContent = element.tickets_sold;
  });
}

// Function to validate form fields
function validateForm() {
  // Validate the name field
  const nameInput = document.getElementById("name");
  if (nameInput.value === "") {
    alert("Please enter a name.");
    return false; // Prevent form submission
  }

  // Validate the email field
  const emailInput = document.getElementById("email");
  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email address.");
    return false; // Prevent form submission
  }

  // Validate the password field
  const passwordInput = document.getElementById("password");
  if (passwordInput.value.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false; // Prevent form submission
  }

  // All fields are valid, allow form submission
  return true;
}

let totalTickets = 0;
let continueBuying = true;

while (continueBuying) {
  let input = prompt("How many movie tickets would you like to buy?");

  if (input === null) {
    // User clicked cancel, exit the loop
    continueBuying = false;
  } else {
    let tickets = parseInt(input);

    if (!isNaN(tickets) && tickets > 0) {
      totalTickets += tickets;
      console.log(`You've added ${tickets} ticket(s) to your cart.`);
    } else {
      console.log("Invalid input. Please enter a valid number.");
    }
  }
}

console.log(`Total tickets in your cart: ${totalTickets}`);

// Film data
const filmData = [
  { title: "Film 1", genre: "action", releaseDate: "2022-01-01", rating: 4 },
  { title: "Film 2", genre: "comedy", releaseDate: "2021-05-15", rating: 3.5 },
  { title: "Film 3", genre: "drama", releaseDate: "2020-09-30", rating: 4.2 }
  // Add more films as needed
];

// Function to render the film list based on current sorting and filtering selections
function renderFilmList(sortBy, filterBy) {
  let filteredFilms = filmData;

  // Apply filtering
  if (filterBy !== "all") {
    filteredFilms = filteredFilms.filter(film => film.genre === filterBy);
  }

  // Apply sorting
  filteredFilms.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "releaseDate") {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
  });

  const filmList = document.getElementById("film-list");
  filmList.innerHTML = "";

  // Render the filtered and sorted film list
  filteredFilms.forEach(film => {
    const li = document.createElement("li");
    li.textContent = film.title;
    filmList.appendChild(li);
  });
}

// Event listener for sorting select
const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;
  const filterBy = genreSelect.value;
  renderFilmList(sortBy, filterBy);
});

// Event listener for genre select
const genreSelect = document.getElementById("genre-select");
genreSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;
  const filterBy = genreSelect.value;
  renderFilmList(sortBy, filterBy);
});

// Initial render of the film list
renderFilmList("title", "all");

// Function to fetch film data and render it in HTML
function getData() {
  fetch("http://localhost:3000/films")
    .then((response) => {
      response.json().then(films => films.forEach(element => renderData(element)));
    });
}

getData();
