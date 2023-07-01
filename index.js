// Get references to HTML elements
const filmsList = document.getElementById('films'); // List of films
const movieDetails = document.getElementById('movie-details'); // Container for movie details
const runtime = document.getElementById('runtime'); // Display for movie runtime
const showtime = document.getElementById('showtime'); // Display for movie showtime
const availableTickets = document.getElementById('Available-tickets'); // Display for available tickets count
const ticketButton = document.getElementById('ticketsBtn'); // Button to purchase tickets

// Fetch movie data from API
fetch('http://localhost:3000/films')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    }
    return response.json();
  })
  .then(data => {
    // Populate movies list
    data.forEach(movie => {
      const listItem = document.createElement('li'); // Create a list item element
      listItem.textContent = movie.title; // Set the text content of the list item to the movie title
      listItem.value = movie.id; // Assuming the API provides movie IDs, assign the movie ID to the list item value
      filmsList.appendChild(listItem); // Append the list item to the films list
    });
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
    alert('Failed to fetch movie data. Please try again later.');
  });

// Add event listener for movie selection
filmsList.addEventListener('click', (event) => {
  const movieId = event.target.value; // Get the selected movie ID

  // Fetch movie details from API based on the selected movie ID
  fetch(`http://localhost:3000/films/${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return response.json();
    })
    .then(movie => {
      // Display movie details
      movieDetails.innerHTML = `
        <h3>${movie.title}</h3>
        <p>Runtime: ${movie.runtime}</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${movie.availableTickets}</p>
      `;

      // Update the global variables with the selected movie details
      runtime.textContent = `Runtime: ${movie.runtime}`;
      showtime.textContent = `Showtime: ${movie.showtime}`;
      availableTickets.textContent = `Available Tickets: ${movie.availableTickets}`;
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
      alert('Failed to fetch movie details. Please try again later.');
    });
});

// Add event listener for ticket button click
ticketButton.addEventListener('click', () => {
  const movieId = filmsList.value; // Get the selected movie ID

  // Fetch movie details from API based on the selected movie ID
  fetch(`http://localhost:3000/films/${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return response.json();
    })
    .then(movie => {
      if (movie && movie.availableTickets > 0) {
        // Decrement available tickets count
        movie.availableTickets--;

        // Update the displayed available tickets count
        availableTickets.textContent = `Available Tickets: ${movie.availableTickets}`;

        alert('Congratulations! You have successfully purchased a ticket.');
      } else {
        alert('Sorry, there are no more tickets available for this movie.');
      }
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
      alert('Failed to fetch movie details. Please try again later.');
    });
});
