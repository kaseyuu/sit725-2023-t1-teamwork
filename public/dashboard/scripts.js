

// Refreshing the page for home and logo
function refreshPage() {
  window.location.reload();
}

// onclick scroll for categories, about us and contact us navbar
document
  .getElementById("categories_tab")
  .addEventListener("click", scrollCategories, true);
function scrollCategories() {
  document.querySelector("html,body").scroll({
    top: document.querySelector(".stripe_1").offsetTop,
    behavior: "smooth",
  });
}

document
  .getElementById("about_us_tab")
  .addEventListener("click", scrollAboutUs, true);
function scrollAboutUs() {
  console.log("abot");
  document.querySelector("html,body").scroll({
    top: document.querySelector(".about_us_page").offsetTop,
    behavior: "smooth",
  });
}

document
  .getElementById("contact_us_tab")
  .addEventListener("click", scrollContactUs, true);
function scrollContactUs() {
  console.log("cta");
  document.querySelector("html,body").scroll({
    top: document.querySelector(".cta_page").offsetTop,
    behavior: "smooth",
  });
}

// redirecting to search page
document
  .getElementById("search_tab")
  .addEventListener("click", redirectSearchPage, true);
document
  .getElementById("button")
  .addEventListener("click", redirectSearchPage, true);
function redirectSearchPage() {
  location.href = "http://127.0.0.1:5500/public/clothes.html";
}

// logout-dropdown menu
//Multiple options dropdown
document
  .getElementById("logout_tab")
  .addEventListener("click", myFunction, true);
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".logout_tab")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// redirecting to handles
//Facebook
document
  .getElementById("fb_handle")
  .addEventListener("click", redirectFacebookPage, true);
function redirectFacebookPage() {
  window.open(
    "https://www.facebook.com/people/Rewearit/100093116108440/",
    "_blank"
  );
}
//Instagram
document
  .getElementById("insta_handle")
  .addEventListener("click", redirectInstagramPage, true);
function redirectInstagramPage() {
  window.open("https://www.instagram.com/rewearit_official/", "_blank");
}

//Youtube
document
  .getElementById("youtube_handle")
  .addEventListener("click", redirectYoutubePage, true);
function redirectYoutubePage() {
  window.open("https://www.youtube.com/@RewearIt", "_blank");
}

// scrolling down (not done)

// document
//   .getElementById("home_services")
//   .addEventListener("click", scrollHomeServices, true);

// function scrollHomeServices(){
//     document.getElementById("categories_tab").scrollIntoView({
// });
// }

// document
//   .getElementById("about_us_services")
//   .addEventListener("click", scrollAboutUsservices, true);

// function scrollAboutUsservices(){
//     document.getElementById("about_us_page").scrollIntoView({
// });
// }

// official-video 
// Play the video on hover
// Get the div element and  video
const video = document.getElementById("rewaerit_video");
var videoPos = [];
function checkPos() {
  var element = video;
  // get its bounding rect
  var rect = element.getBoundingClientRect();
  console.log(rect);
  // we may already have scrolled in the page
  // so add the current pageYOffset position too
  var top = rect.top + window.pageYOffset;
  var bottom = rect.bottom + window.pageYOffset;
  if (videoPos) {
    videoPos.el = element;
    videoPos.top = top;
    videoPos.bottom = bottom;
  } else {
    // first time, add an event listener to our element
    element.addEventListener("loadeddata", function () {
      if (++loaded === video.length - 1) {
        // all our video have ben loaded, recheck the positions
        // using rAF here just to make sure elements are rendered on the page
        requestAnimationFrame(checkPos);
      }
    });
    // push the object in our array
    videoPos.push({
      el: element,
      top: top,
      bottom: bottom,
    });
  }
}
// an initial check
checkPos();

var scrollHandler = function () {
  // our current scroll position
  // the top of our page
  var min = window.pageYOffset;
 
  // the bottom of our page
  var max = min + window.innerHeight;
    if (videoPos.top >= min && videoPos.top < max) {
      // play the video
    
      videoPos.el.play();
    }
    // the bottom of the video is above the top of our page
    // or the top of the video is below the bottom of our page
    // ( === not visible anyhow )
    if (videoPos.bottom <= min || videoPos.top >= max) {
      // stop the video
      
      videoPos.el.pause();
    }
  };

// add the scrollHandler
window.addEventListener("scroll", scrollHandler, true);
// don't forget to update the positions again if we do resize the page
window.addEventListener("resize", checkPos);

// --------------------------------------------------------------------------------------


var array = [
    "https://i.ibb.co/8jdTpj1/photo-1.jpg",
    "https://i.ibb.co/B4LnXXX/photo-2.jpg",
    "https://i.ibb.co/pnLX8tj/photo-3.jpg",
    "https://i.ibb.co/wMKcdpM/photo-4.jpg",
    "https://i.ibb.co/sgLG5Cm/photo-5.jpg",
    "https://i.ibb.co/GtMyCPH/photo-6.jpg",
    "https://i.ibb.co/K2Nvj7J/photo-7.jpg",
    "https://i.ibb.co/0V4RkmH/photo-8.jpg"

];

window.onload = function () {
  getPhotoWall();
};

function arr(array) {
  console.log(array);

  for (var i = 0; i < array.length; i++) {
    var photo_wall_container = document.createElement("div");
    photo_wall_container.innerHTML = `<div class="photo_${i + 1}">
        <img src="${array[i]}" id="image${i + 1}">
      </div>`;
    document.getElementById("photo_wall_div").appendChild(photo_wall_container);
    // photo_wall_container.style.backgroundColor = "red";
    // document.getElementById("image" + i).style.height = "7vh";
    // document.getElementById("image" + i).style.maxWidth = "7vh";
    // document.getElementById("image" + i).style.borderRadius = "5vh";
    // document.getElementById("last_msg" + i).style.marginTop = "0.8vh";
  }
}

function getPhotoWall(){
  axios({
    method: "get",
    url: "http://127.0.0.1:3000/api/photo-wall"
  })
    .then(function (response) {
      arr(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
      
    });
}