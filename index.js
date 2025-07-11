// Generate 200 random names
const names = [];
const sample = ["John", "Jane", "Alice", "Bob", "Mike", "Sara", "Tom", "Tina", "Lily", "Luke"];
for (let i = 0; i < 200; i++) {
  names.push(sample[Math.floor(Math.random() * sample.length)] + " " + (i + 1));
}

const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");
const keystrokeCountEl = document.getElementById("keystrokes");
const searchCountEl = document.getElementById("searchCount");
const loader = document.getElementById("loader");
const noResults = document.getElementById("noResults");
const backToTop = document.getElementById("backToTop");

let keystrokes = 0;
let debouncedSearchCount = 0;

function highlightMatch(name, query) {
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  return name.replace(regex, "<span class='highlight'>$1</span>");
}

function displayResults(query) {
  if (query.trim() === "") {
    results.innerHTML = "";
    noResults.style.display = "none";
    return;
  }

  const filtered = names.filter(name => name.toLowerCase().includes(query.toLowerCase()));
  results.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  filtered.forEach(name => {
    const div = document.createElement("div");
    div.className = "name";
    div.innerHTML = highlightMatch(name, query);
    results.appendChild(div);
  });
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      loader.style.display = "block";
      func.apply(this, args);
      loader.style.display = "none";
    }, delay);
  };
}

function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const debouncedSearch = debounce((query) => {
  debouncedSearchCount++;
  searchCountEl.textContent = debouncedSearchCount;
  displayResults(query);
}, 1000);

searchBox.addEventListener("input", (e) => {
  const query = e.target.value;
  keystrokes++;
  keystrokeCountEl.textContent = keystrokes;
  debouncedSearch(query);
});

// Scroll listener with throttle
window.addEventListener("scroll", throttle(() => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
}, 500));

// Back to Top button
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
