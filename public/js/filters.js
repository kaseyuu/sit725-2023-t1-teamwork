// Get all the <a> tags with the class dropdown-item inside the filters class
const filterLinks = document.querySelectorAll(".filters a.dropdown-item");

// Get the Price Range apply button
const priceRangeApplyBtn = document.getElementById("priceRangeApplyBtn");

const selectedFilters = Object.fromEntries(
    new URLSearchParams(window.location.search)
);

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    // Update the selectedFilters object
    selectedFilters["searchText"] = searchInput;
    // Log the selected filters
    replaceURLParams(selectedFilters);
});

// Attach click event to each <a> tag
filterLinks.forEach((link) => {
    // Get the filter category from the parent element's ID
    const categoryElement = link.closest(".filter").id;
    const category = categoryElement.replace("Filter", "");

    // Get the filter value
    const value = link.textContent.trim();

    link.addEventListener("click", function (event) {
        event.preventDefault();

        selectedFilters[category] = value;
        replaceURLParams(selectedFilters);
    });

    const selectedValue = selectedFilters[category];
    // apply grey color for selected filters
    if (value === selectedValue) {
        link.style.backgroundColor = "#C8C8C8";
    }
});

// Attach click event to the Price Range apply button
priceRangeApplyBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button behavior

    // Get the minimum and maximum prices
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    // Update the selectedFilters object with the price range
    selectedFilters["minPrice"] = minPrice;
    selectedFilters["maxPrice"] = maxPrice;

    replaceURLParams(selectedFilters);
});

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
minPriceInput.placeholder = selectedFilters.minPrice;
maxPriceInput.placeholder = selectedFilters.maxPrice;

function replaceURLParams(a) {
    var url = new URL(window.location.href);
    const searchParams = new URLSearchParams();

    Object.entries(a).forEach(([key, value]) => {
        searchParams.append(key, value);
    });

    // Update URL with new parameters
    var newURL = url.origin + url.pathname + "?" + searchParams.toString();
    window.location.href = newURL;
}