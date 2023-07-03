// Client ID and API key from the Google Developers Console
var CLIENT_ID = '585294421526-o36njbpa81oftfv9la4anatjjoodlmh5.apps.googleusercontent.com';
var API_KEY = 'AIzaSyC443v_E-5balwvcGsFR0xHMNbrKkeJJBU';

// ID of the Google Spreadsheet
var SPREADSHEET_ID = 'MyMapData_MyMapProj';

// Array containing the scopes for the Google Sheets API
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    var name = $('#name').val();
    var mobile = $('#mobile').val();

    // Get the user's live location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Send the data to Google Sheets
            sendToGoogleSheets(name, mobile, latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to send data to Google Sheets using the Sheets API
function sendToGoogleSheets(name, mobile, latitude, longitude) {
    gapi.load('client:auth2', initClient);

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            scope: SCOPES.join(' ')
        }).then(function() {
            gapi.auth2.getAuthInstance().signIn().then(function() {
                var values = [
                    [name, mobile, latitude, longitude]
                ];

                gapi.client.sheets.spreadsheets.values.append({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'Sheet1!A1',
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        values: values
                    }
                }).then(function(response) {
                    console.log('Data sent to Google Sheets.');
                    $('#userForm')[0].reset();
                }, function(reason) {
                    console.error('Error: ' + reason.result.error.message);
                });
            });
        });
    }
}

// Add event listener to the form
$('#userForm').on('submit', handleFormSubmit);
