document.getElementById("save").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  localStorage.setItem("jongo-email", email);
  localStorage.setItem("jongo-pass", pass);
  localStorage.setItem("verify-code", code);

  // Send verification code to backend server
  fetch("http://localhost:3000/send-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("status").innerText = `Code sent to ${email}`;
    } else {
      document.getElementById("status").innerText = "❌ Failed to send code.";
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("status").innerText = "❌ Error contacting server.";
  });
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