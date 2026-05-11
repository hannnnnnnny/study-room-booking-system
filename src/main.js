const currentDate = document.querySelector('#currentDate')

if (currentDate) {
  currentDate.textContent = new Intl.DateTimeFormat('en-NZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())
}
