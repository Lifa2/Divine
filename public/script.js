// Optional: AJAX form submission (instead of default form submit)

const form = document.getElementById('divineForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const text = await response.text();

    if (response.ok) {
      messageDiv.textContent = text;
      form.reset();
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Error submitting form';
    }
  } catch (error) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Network error';
  }
});
