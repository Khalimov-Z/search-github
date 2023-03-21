const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results');

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchString = searchInput.value.trim();
  if (searchString.length < 3) {
    alert('Подстрока поиска должна содержать не менее 3 символов');
    return;
  }

  fetch(`https://api.github.com/search/repositories?q=${searchString}&sort=stars&order=desc`)
.then(response => response.json())
    .then(data => {
      if (data.items.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Ничего не найдено</div>';
        return;
      }

      resultsContainer.innerHTML = data.items.slice(0, 10).map(item => `
        <div class="result">
          <a href="${item.html_url}" target="_blank">
            <div class="name">${item.name}</div>
          </a>
            <div class="description">${item.description}</div>
        </div>
      `).join('');
    })
    .catch(error => console.error(error));
});