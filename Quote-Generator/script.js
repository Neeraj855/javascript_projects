const container = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote')

// Get Quote from API
async function getQuote() {
  const apiUrl =
    "https://programming-quotes-api.herokuapp.com/quotes/random";
  try {
    const response = await fetch( apiUrl);
    const data = await response.json();
   
    // if author is not known , add Unknown
    if (data.quotAuthor === ''){
        authorText.innerText = 'Unknown';
    }else{
        authorText.innerText = data.author

    }
    quoteText.innerText = data.en
  } catch (error) {
  }
}


// Event Listner

newQuoteBtn.addEventListener('click',getQuote);


// On Load
getQuote();
