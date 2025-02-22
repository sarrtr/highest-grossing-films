document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#films-table tbody');
    const searchInput = document.getElementById('search');
    const sortYearButton = document.getElementById('sort-year');

    let films = [];

    // Load JSON data
    fetch('films.json')
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
                <td>${film.title}</td>
                <td>${film.release_year}</td>
                <td>${film.director}</td>
                <td>${film.box_office}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Filter films by title or director
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredFilms = films.filter(film =>
            film.title.toLowerCase().includes(query) || film.director.toLowerCase().includes(query)
        );
        renderTable(filteredFilms);
    });

    // Sort films by release year
    sortYearButton.addEventListener('click', () => {
        const sortedFilms = [...films].sort((a, b) => a.release_year - b.release_year);
        renderTable(sortedFilms);
    });
});