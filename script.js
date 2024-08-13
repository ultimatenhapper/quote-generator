const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

//Show new quote
function newQuote(apiQuotes) {
  //Pick a random quote from apiQuotes array

  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

//Get Quote from API
async function getQuotes() {
  showLoadingSpinner();

  // const proxyUrl = "https://blooming-retreat-52027.herokuapp.com/";
  // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    const quotes = await response.json();
    const quote = newQuote(quotes);
    //If author is blank, add 'Unknown'
    if (quote.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = quote.author;
    }
    //Reduce the font size for long quotes
    if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = quote.text;
    removeLoadingSpinner();
  } catch (error) {
    quotes = getQuotes();
  }
}

//Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//EventListeners
newQuoteBtn.addEventListener("click", getQuotes);

twitterBtn.addEventListener("click", tweetQuote);

//onLoad
getQuotes();
