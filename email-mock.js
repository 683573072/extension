const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const email = urlParams.get("email");

console.log(`Pretending to send email to ${email} with code: ${code}`);