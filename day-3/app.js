document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    localStorage.setItem("uid", auth.currentUser.uid);
    window.location.href = "tracker.html";
  } catch (err) {
    alert("Login Failed: " + err.message);
  }
});

document.getElementById('signupBtn').addEventListener('click', async () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert("Signup Successful. You can now login.");
  } catch (err) {
    alert("Signup Error: " + err.message);
  }
});
