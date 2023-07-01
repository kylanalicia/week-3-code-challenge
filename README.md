# Movie Ticket Booking System

This is a movie ticket booking system that allows users to view available movies, select a movie, and purchase tickets. The system fetches movie data from an API and displays it on the webpage. Users can click on a movie to view its details such as runtime, showtime, and available tickets. They can also purchase tickets if there are tickets available for the selected movie.

## Features

- Display a list of available movies fetched from an API
- Show detailed information about a selected movie including title, runtime, showtime, and available tickets
- Allow users to purchase tickets for a selected movie
- Update the available tickets count after a successful ticket purchase
- Display error messages if there is a problem fetching movie data or details

## Technologies Used

- HTML
- CSS
- JavaScript

## Installation

1. Clone this repository to your local machine.
2. Open the index.html file in a web browser.

## Usage

1. Upon opening the application, a list of available movies will be displayed.
2. Click on a movie to view its details.
3. The movie details section will show the movie's title, runtime, showtime, and available tickets.
4. To purchase tickets, click on the "Buy Tickets" button.
5. If there are available tickets for the selected movie, the available tickets count will be updated and a success message will be shown.
6. If there are no more tickets available for the selected movie, an error message will be displayed.

## API Endpoint

The application fetches movie data from the following API endpoint:

`http://localhost:3000/films`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

