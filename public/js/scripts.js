let socket = io();
socket.on('showBanner', (msg) => {
    document.getElementById('prompt').style.display = 'block';
})
