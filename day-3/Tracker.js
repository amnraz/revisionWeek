const baseURL = 'http://localhost:3000/books'; // define before using

const uid = localStorage.getItem('uid');
if (!uid) window.location.href = 'index.html';


document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, read: false, uid })
  });

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  loadBooks();
});

async function loadBooks() {
  const res = await fetch(baseURL);
  const books = await res.json();
  const filter = document.querySelector('input[name="filter"]:checked').value;

  const filtered = books.filter(book =>
    book.uid === uid &&
    (filter === 'all' ||
     (filter === 'read' && book.read) ||
     (filter === 'unread' && !book.read))
  );

  renderBooks(filtered);
}

function renderBooks(books) {
  const list = document.getElementById('bookList');
  list.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${book.title}</strong> by ${book.author} - ${book.read ? '✅ Read' : '📖 Unread'}</p>
      <button onclick="toggleRead(${book.id}, ${!book.read})">${book.read ? 'Mark Unread' : 'Mark Read'}</button>
      <button onclick="deleteBook(${book.id})">❌ Delete</button>
    `;
    list.appendChild(div);
  });
}

async function toggleRead(id, readStatus) {
  await fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: readStatus })
  });
  loadBooks();
}

async function deleteBook(id) {
  await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
  loadBooks();
}

function logout() {
  localStorage.clear();
  auth.signOut().then(() => window.location.href = "index.html");
}

document.querySelectorAll('input[name="filter"]').forEach(input => {
  input.addEventListener('change', loadBooks);
});

loadBooks();
