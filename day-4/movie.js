let currentPage = parseInt(localStorage.getItem("page")) || 1;
let allMovies = [];
const moviesPerPage = 6;

const movieList = document.getElementById("movieList");
const pageNum = document.getElementById("pageNum");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sortSelect = document.getElementById("sort");
const genreSelect = document.getElementById("genre");

// Fetch movies
async function fetchMovies() {
  const res = await fetch("https://api.tvmaze.com/shows");
  const data = await res.json();
  allMovies = data;
  applyFilters();
}

// Render movies
function renderMovies(movies) {
  movieList.innerHTML = "";
  if (movies.length === 0) {
    movieList.innerHTML = "<p>No movies found.</p>";
    return;
  }

  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const pageMovies = movies.slice(start, end);

  pageMovies.forEach(movie => {
    const genres = movie.genres.join(", ") || "N/A";
    const rating = movie.rating.average || "N/A";
    movieList.innerHTML += `
      <div class="movie">
        <img src="${movie.image?.medium}" alt="${movie.name}" />
        <h3>${movie.name}</h3>
        <p><strong>Genre:</strong> ${genres}</p>
        <p><strong>Rating:</strong> ${rating}</p>
        <button onclick="addToWatchLater(${movie.id})">+ Watch Later</button>
      </div>
    `;
  });

  pageNum.textContent = `Page ${currentPage}`;
  localStorage.setItem("page", currentPage);
}

// Sorting and Filtering
function applyFilters() {
  let filtered = [...allMovies];

  const selectedGenre = genreSelect.value;
  const selectedSort = sortSelect.value;

  if (selectedGenre) {
    filtered = filtered.filter(movie =>
      movie.genres.includes(selectedGenre)
    );
  }

  if (selectedSort === "rating") {
    filtered.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
  } else if (selectedSort === "title") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderMovies(filtered);
}

// Pagination handlers
prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    applyFilters();
  }
};

nextBtn.onclick = () => {
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    applyFilters();
  }
};

// Watch Later feature
function addToWatchLater(id) {
  let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
  if (!watchLater.includes(id)) {
    watchLater.push(id);
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
    alert("Added to Watch Later!");
  } else {
    alert("Already in Watch Later list.");
  }
}

// Event Listeners
sortSelect.onchange = applyFilters;
genreSelect.onchange = applyFilters;

// Initialize
fetchMovies();