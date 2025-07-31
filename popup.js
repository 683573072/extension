document.getElementById("save").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  localStorage.setItem("jongo-email", email);
  localStorage.setItem("jongo-pass", pass);
  localStorage.setItem("verify-code", code);

  // Simulate sending email
  fetch("email-mock.js?code=" + code + "&email=" + email);
  document.getElementById("status").innerText = `Code sent to ${email}`;
});

document.getElementById("verify").addEventListener("click", () => {
  const entered = document.getElementById("code").value;
  const correct = localStorage.getItem("verify-code");

  if (entered === correct) {
    document.getElementById("status").innerText = "✅ Login verified!";
  } else {
    document.getElementById("status").innerText = "❌ Incorrect code!";
  }
});