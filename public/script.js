document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData(form);

  const fileInput = document.getElementById('file');
  const file = fileInput.files[0]; 

  formData.append('file', file);

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});