const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.author) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = 'Unknown';
  }

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  try {
    const response = await fetch('https://type.fit/api/quotes');
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', newQuote);

getQuotes();
