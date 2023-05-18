const form = document.querySelector('form');
const searchInput = document.getElementById('ip1');
const searchTerm = localStorage.getItem('searchTerm');
const resultsDiv = document.getElementById('results');
const buttons = document.querySelectorAll('button');

if (searchTerm) {
	searchInput.value = searchTerm;
}

let gridColumns=4;
let gridRows=4;

buttons.forEach(button => {
	button.addEventListener('click', async function(event) {
	event.preventDefault();

    const buttonId = this.id;

    if (buttonId === 'b1') {
      gridColumns = 4;
      gridRows = 4;
    } else if (buttonId === 'b2') {
      gridColumns = 2;
      gridRows = 8;
    } else if (buttonId === 'b3') {
      gridColumns = 8;
      gridRows = 2;
    }

  const apiKey = 'bn56wfoNF0SDNkelm9tHwNMxfKqS4cqU';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=16`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    showResults(data.data, gridColumns, gridRows);
  } 
  catch (error) {
    console.error('Error:', error);
  }
});
});

function showResults(results, gridColumns, gridRows) {
	resultsDiv.innerHTML = '';
	resultsDiv.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
	resultsDiv.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;
  
	results.forEach(result => {
	  const img = document.createElement('img');
	  img.src = result.images.fixed_height.url;
	  img.alt = result.title;
  
	  const div = document.createElement('div');
	  div.classList.add('result');
	  div.appendChild(img);
  
	  resultsDiv.appendChild(div);
	});
}