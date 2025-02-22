document.addEventListener('DOMContentLoaded', () => {
    const filmsContainer = document.getElementById('films-container');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');

    let films = [];

    // Load JSON data
    fetch('films.json')
        .then(response => response.json())
        .then(data => {
            films = data;
            renderFilms(films);
        });

    // Render films
    function renderFilms(data) {
        filmsContainer.innerHTML = '';
        data.forEach((film, index) => {
            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <div class="serial">${index + 1}</div>
                <img src="covers/cover${index + 1}.jpg" alt="${film.title} Cover" class="cover">
                <div class="details">
                    <h2>${film.title}</h2>
                    <div class="info">
                        <p><strong>Director:</strong> ${film.director}</p>
                        <p><strong>Year:</strong> ${film.release_year}</p>
                        <p><strong>Country:</strong> ${film.country}</p>
                        <p><strong>Box Office:</strong> ${film.box_office}</p>
                    </div>
                </div>
            `;
            filmsContainer.appendChild(filmCard);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredFilms = films.filter(film =>
            film.title.toLowerCase().includes(query) || 
            film.director.toLowerCase().includes(query)
        );
        renderFilms(filteredFilms);
    });

    // Sorting functionality
    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        const sortedFilms = [...films].sort((a, b) => {
            switch(sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'year':
                    return a.release_year - b.release_year;
                case 'director':
                    return a.director.localeCompare(b.director);
                case 'box_office':
                    return parseBoxOffice(b.box_office) - parseBoxOffice(a.box_office);
                default:
                    return 0;
            }
        });
        renderFilms(sortedFilms);
    });

    function parseBoxOffice(value) {
        return parseFloat(value.replace(/[^0-9.]/g, ''));
    }
});
