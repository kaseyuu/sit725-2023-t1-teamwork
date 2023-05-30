const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    performSearch(searchInput);
});

function performSearch(query) {
    console.log('search query:', query);
}

let socket = io();
socket.on('showBanner', (msg) => {
    console.log('Received showBanner');
    // TODO: apply display: block to banner element
    document.getElementById('prompt').style.display = 'block';
})
