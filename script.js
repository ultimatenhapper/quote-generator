const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if(!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;

  }
}

//Show new quote
function newQuote() {
  //Pick a random quote from apiQuotes array
  //const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const quote = getQuote();
  

}

//Get Quote from API
async function getQuote(){
  showLoadingSpinner();

  const proxyUrl = 'https://blooming-retreat-52027.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //If author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce the font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();

  } catch (error){
    getQuote();

  }
}

//Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//EventListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad
getQuote();