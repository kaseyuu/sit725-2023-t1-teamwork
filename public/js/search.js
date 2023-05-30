// using the Autocomplete library to initialize an autocomplete feature for the search box 
import Autocomplete from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-autocomplete@master/autocomplete.js";
Autocomplete.init("input.autocomplete", {
    valueField: "id",
    labelField: "title",
    highlightTyped: true,
    onSelectItem: console.log,
    server: "/search-prompts",
    liveServer: true,
});