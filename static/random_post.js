function generateRandomPost() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/random-posts/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var responseData = JSON.parse(xhr.responseText);
            document.getElementById('random-post').innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${responseData.title}</h2>
                    <p class="card-text">${responseData.emoji}</p>
                    <p class="card-text">${'Author: ' + responseData.author}</p>
                </div>
            `;
        }
    };
    xhr.send();
}