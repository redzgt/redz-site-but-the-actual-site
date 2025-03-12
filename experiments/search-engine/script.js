// Simulate a small "database" of pages to search through
const pages = [
  { title: "Document 1", content: "This is the content of the first document." },
  { title: "Document 2", content: "Another document with some content to search through." },
  { title: "Document 3", content: "Third document with more text for searching." },
  { title: "Document 4", content: "Learning how to create a search engine." }
];

// Function to filter the pages based on the search query
function search(query) {
  return pages.filter(page => 
    page.title.toLowerCase().includes(query.toLowerCase()) || 
    page.content.toLowerCase().includes(query.toLowerCase())
  );
}

// Function to display the search results
function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
  } else {
    results.forEach(result => {
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `<h3>${result.title}</h3><p>${result.content}</p>`;
      resultsContainer.appendChild(resultDiv);
    });
  }
}

// Event listener for search input
document.getElementById("searchBar").addEventListener("input", function(event) {
  const query = event.target.value;
  const results = search(query);
  displayResults(results);
});
