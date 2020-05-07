document.getElementById("home-button").addEventListener('click', makeHttpRequest);

const makeHttpRequest = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/');
    xhr.send();
}