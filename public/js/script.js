$(".info-item .btn").click(function(){
    $(".container").toggleClass("log-in");
  });
  $(".container-form .btn").click(function(){
    $(".container").addClass("active");
  });

  function validateForm() {
    var uName = document.forms["loginForm"]["Username"].value;
    var pass = document.forms["loginForm"]["Password"].value;
    if (uName == "" || uName == null) {
      alert("Username must be filled out!");
      return false;
    }
    if (pass == "" || uNpassame == null) {
      alert("Password must be filled out!");
      return false;
    }
};

function registerForm() {
  var fields = document.forms["regForm"]["email","fullName","Username","Password","confPassword"].value;
  if (fields == "" || fields == null) {
    alert("Please fill up all fields!");
    return false;
  }
};
