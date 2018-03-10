// Categories list
var categories = [
  {name: 'politics', css_class: 'background-blue'},
  {name: 'sport', css_class: 'background-green'}
]

// Quotes list
var quotes = [
  {
    quote: 'It all depends on what the meaning of the word ‘is’ is.',
    source: 'President Bill Clinton',
    citation: 'Grand Jury testimony',
    year: 1998,
    category: categories[0],
  },
  {
    quote: 'Outside of the killings, DC has one of the lowest crime rates in the country.',
    source: 'Former mayor of Washington, D.C. Marion Barry',
    citation: 'National Press Club speech',
    category: categories[0],
  },
  {
    quote: 'But we have to pass the bill so that you can find out what is in it, away from the fog of the controversy.',
    source: 'Nancy Pelosi',
    category: categories[0]
  },
  {
    quote: 'Winners never quit and quitters never win.',
    source: 'Vince Lombardi',
    category: categories[1]
  },
  {
    quote: 'I want to build a team that’s invincible, so that they have to senda team from bloody Mars to beat us.',
    source: 'Bill Shankly',
    category: categories[1]
  },
  {
    quote: 'It’s not the will that matters – everyone has that. It’s the will to prepare to win.',
    source: 'Paul William',
    category: categories[1]
  },
  {
    quote: 'Winning isn’t everything.There should be no conceit in victoryv and no despair in defeat.',
    source: 'Sir Alexander Matthew',
    category: categories[1]
  },
  // Wrong object with missing required data. It will never be showed
  {
    source: 'Donald Trump'
  }
];

// Store setInterval function for print quote
var repeat_quote;

// Store last valid quote
var last_quote;

// This variable can filter quotes by category. Set to 0 wil show only politics
// set to 1 will show only sport quotes. 0 and 1 are index of categories array and are used like id
var active_category = false;

// List of valid quotes. Used for filter by category logic
var filtered_quotes = quotes;

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Print quote on page load
printQuote();

/**
  * Get random quote from quotes array.
*/
function getRandomQuote(){
  var quotes_length = filtered_quotes.length;
  // There are no more quotes
  if(quotes_length === 0){
      printNoMoreQuotesMessage();
      return null;
  }
  // There are only one quote and is the last showed quote
  else if(quotes_length === 1 && filtered_quotes[0] === last_quote){
    printNoMoreQuotesMessage();
    return last_quote;
  }
  // Get random quote
  var random_index = Math.floor(Math.random() * quotes_length);
  var quote = quotes[random_index];
  var is_valid = quoteIsValid(quote)  && categoryIsValid(quote);
  // Check if quote is valid and it is not the same as last showed quote
  if(is_valid && quote !== last_quote){
    last_quote = quote;
    return quote;
  }
  else{
    if(!is_valid){
      // Remove not valid quote in order to optimize search
      filtered_quotes.splice(random_index, 1);
    }
    // Get another quote
    return getRandomQuote();
  }
}

/**
  * Print quote. Instructions from the project descriptions are to call get the quote
  * inside of printQuote function. But I think it`s better if pass the quote as function
  * parameter in for more flexibility
*/
function printQuote(){
  var quote = getRandomQuote();
  var html = '';
  // Restart interval
  repeatQuotes();
  if(quote){
    html+='<p class="quote">'+quote['quote']+'</p>';
    html+='<p class="source">'+quote['source'];
    // Check for optional fields
    if(quote['citation']){
      html+='<span class="citation"> '+quote['citation']+' </span>';
    }
    if(quote['year']){
      html+='<span class="year"> '+quote['year']+' </span>';
    }
    html+'</p>';
    // set background color depends on category
    setBackgroundColor(quote);
    // set html
    document.getElementById('quote-box').innerHTML = html;
  }
}
/**
 * Print no more quotes message in console
*/
function printNoMoreQuotesMessage(){
  console.log('No more quotes');
}

/**
  * Restart interval of print quotes. If user not click the button 30 seconds
  * this function will show randon quote
*/
function repeatQuotes(destroy){
  if(repeat_quote){
    clearInterval(repeat_quote);
  }
  if(!destroy){
    repeat_quote = setInterval(printQuote, 30000);
  }
}

/**
  * Set background color to body and button. Background color depends on
  * quote category. Each category have a different css class and different color
  * css classes are described in styles.css
  * @param {Object} quote Quote object
*/
function setBackgroundColor(quote){
  var css_class = '';
  // check if quote has a category and category has defined css class
  if(quote && quote['category'] && quote['category']['css_class']){
    css_class = quote['category']['css_class'];
  }
  // change body background color
  document.body.className = css_class;
  // change button background color
  document.getElementById('loadQuote').className = css_class;
}

/**
  * Check if category is valid if active_category filter is active.
  * @param {Object} quote Quote object
*/
function categoryIsValid(quote){
  // Check if active_category index is correct and quote has category
  if(active_category > -1 && categories[active_category]){
    return quote['category'] && (quote['category'] === categories[active_category]);
  }
  return true;
}

/**
* Check if quote is valid and has all required properties
* @param {Object} quote Quote object
*/
function quoteIsValid(quote){
  return quote['quote'] && quote['source'];
}
