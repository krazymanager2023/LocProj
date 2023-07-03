function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(submitFormWithLocation, handleLocationError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function submitFormWithLocation(position) {
  var name = document.getElementById('name').value;
  var mobileNumber = document.getElementById('mobileNumber').value;
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var xhr = new XMLHttpRequest();
  var url = "https://script.google.com/macros/s/1PW8Tky075FOtFaf9W6vGryjIqnX2gS1prx8qxDiD9F68ruRTiMASe4oV/exec";
  var formData = "name=" + encodeURIComponent(name) + "&mobileNumber=" + encodeURIComponent(mobileNumber) +
    "&latitude=" + encodeURIComponent(latitude) + "&longitude=" + encodeURIComponent(longitude);

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

  xhr.open("POST", url, true);
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
