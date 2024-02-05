const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading spinner
function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getNewRandomQuote();
  } catch (error) {
    alert("Something went wrong! Refresh the page to try again.");
    // Catch Error Here
  }
}

// {
//   text: 'All men commend patience, although few are willing to practice it.',
//   author: 'Thomas a Kempis',
//   tag: 'men'
// }
// Show New Quote
function getNewRandomQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getNewRandomQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotesFromAPI();
