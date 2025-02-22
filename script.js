document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#films-table tbody');
    const searchInput = document.getElementById('search');
    const sortYearButton = document.getElementById('sort-year');

    let films = [];

    // Fetch data from the Flask backend
    fetch('/api/films')
        .then(response => response.json())
        .then(data => {
            films = data;
            renderTable(films);
        });

    // Render the table with film data
    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(film => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${film[0]}</td>
                <td>${film[1]}</td>
                <td>${film[2]}</td>
                <td>${film[3]}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Filter films by title or director
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredFilms = films.filter(film =>
            film[0].toLowerCase().includes(query) || film[2].toLowerCase().includes(query)
        );
        renderTable(filteredFilms);
    });

    // Sort films by release year
    sortYearButton.addEventListener('click', () => {
        const sortedFilms = [...films].sort((a, b) => a[1] - b[1]);
        renderTable(sortedFilms);
    });
});