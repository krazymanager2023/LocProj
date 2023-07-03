document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  submitForm();
});

function submitForm() {
  var name = document.getElementById('name').value;
  var mobileNumber = document.getElementById('mobileNumber').value;

  getLocation(name, mobileNumber);
}

function getLocation(name, mobileNumber) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      sendFormData(name, mobileNumber, latitude, longitude);
    }, handleLocationError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function sendFormData(name, mobileNumber, latitude, longitude) {
  var xhr = new XMLHttpRequest();
  var url = "https://script.google.com/macros/s/AKfycbzDNEl0r9MZQwicb8BlorNfXYS848QGDYC58jClmDUpLv-PouX2TTazLsUFEE5Lp-CJjQ/exec";
  var formData = "name=" + encodeURIComponent(name) + "&mobileNumber=" + encodeURIComponent(mobileNumber) +
    "&latitude=" + encodeURIComponent(latitude) + "&longitude=" + encodeURIComponent(longitude);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        alert("Form submitted successfully!");
      } else {
        alert("Form submission failed. Please try again later.");
      }
    }
  };

  xhr.send(formData);
}

function handleLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
