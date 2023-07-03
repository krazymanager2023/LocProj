// Load the Google Sheets API
function init() {
    gapi.load('client', loadClient);
}

function loadClient() {
    gapi.client.init({
        apiKey: 'AIzaSyBRWW4Qgiwfzh-9S2f4KIEeqNUbvQ1l4gk',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Handle the form submission
        document.getElementById('userForm').addEventListener('submit', submitForm);
    });
}

function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Store the user details in a Google Spreadsheet
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1!A:B',
        valueInputOption: 'RAW',
        resource: {
            values: [[name, email]]
        }
    }).then(function(response) {
        // Display success message
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your details have been registered!',
            showConfirmButton: false,
            timer: 2000
        });

        // Start the treasure hunt
        startTreasureHunt();
    }, function(error) {
        console.error('Error storing user details:', error);
    });
}

function startTreasureHunt() {
    // TODO: Implement the treasure hunt logic
	// Add the following code inside the startTreasureHunt function

// Define the hints and QR codes
const treasureHuntData = [
    {
        hint: "First hint...Chaitanya",
        qrCode: "qr.png"
    },
    {
        hint: "Second hint...CM",
        qrCode: "qr.png"
    },
    {
        hint: "Third hint...Gurukula",
        qrCode: "qr.png"
    },
    {
        hint: "Final hint...Gate",
        qrCode: "qr.png"
    }
];

// Variable to track the current step
let currentStep = 0;

function startTreasureHunt() {
    // Display the first hint and QR code
    displayHintAndQRCode();

    // Add event listener for QR code scanning
    window.addEventListener('message', handleQRCodeScanned);
}

function displayHintAndQRCode() {
    const hintContainer = document.getElementById('hintContainer');
    const currentHint = treasureHuntData[currentStep].hint;
    const currentQRCode = treasureHuntData[currentStep].qrCode;

    hintContainer.innerHTML = `
        <p><strong>Hint:</strong> ${currentHint}</p>
        <img src="${currentQRCode}" alt="QR Code">
    `;
}

function handleQRCodeScanned(event) {
    const qrData = event.data;

    // Check if the QR data matches the current step
    if (qrData === `QR Code ${currentStep + 1}`) {
        // Prompt the user to select their credentials
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        Swal.fire({
            title: 'Location Details',
            html: `
                <label for="location">Select your location:</label>
                <select id="location">
                    <option value="Location 1">Location 1</option>
                    <option value="Location 2">Location 2</option>
                    <option value="Location 3">Location 3</option>
                    <option value="Location 4">Location 4</option>
                </select>
            `,
            confirmButtonText: 'Submit',
            preConfirm: () => {
                const location = document.getElementById('location').value;

                // Store the location details or perform any other actions as needed

                // Proceed to the next step
                currentStep++;
                if (currentStep < treasureHuntData.length) {
                    displayHintAndQRCode();
                } else {
                    // All steps completed
                    Swal.fire({
                        icon: 'success',
                        title: 'Congratulations',
                        text: 'You have completed the treasure hunt!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        });
    } else {
        // QR code doesn't match the current step
        Swal.fire({
            icon: 'error',
            title: 'Invalid QR Code',
            text: 'Please scan the correct QR Code.',
            showConfirmButton: false,
            timer: 2000
        });
    }
}

// Initialize the Google Sheets API
gapi.load('client', loadClient);

}
