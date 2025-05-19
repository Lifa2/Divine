document.getElementById('divineForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const message = document.getElementById('message');
  if (response.ok) {
    message.textContent = '✅ Registration successful!';
    message.style.color = 'green';
    e.target.reset();
  } else {
    message.textContent = '❌ Something went wrong. Please try again.';
    message.style.color = 'red';
  }
});
