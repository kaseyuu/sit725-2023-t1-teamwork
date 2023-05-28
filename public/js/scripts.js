const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function (event)){
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    performSearch(searchInput);
};

function performSearch(query) {
    console.log('search query:', query);
}