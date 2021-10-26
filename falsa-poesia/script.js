fetch('poems/1.txt')
    .then(response => response.text())
    .then(text => console.log(text));