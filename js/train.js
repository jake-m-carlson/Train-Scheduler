// Setup Firebase
// Create button to add train, push to database, push to table
// Pull new train from database
// Calculate next train arrival 
// Calculate how many minutes away


// Setup Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC_gCACqMAEXgCDHYXkkEAzyjKM1nF9CY",
    authDomain: "train-scheduler-pt15.firebaseapp.com",
    databaseURL: "https://train-scheduler-pt15.firebaseio.com",
    projectId: "train-scheduler-pt15",
    storageBucket: "train-scheduler-pt15.appspot.com",
    messagingSenderId: "296765052302",
    appId: "1:296765052302:web:f441fdb3aa1c736c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Create button to add train, push to database, push to table
$("#add-train-btn").on("click",function(event) {
    event.preventDefault();

    // Collect user inputs
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#first-time-input").val().trim();
    var trainFrequency =$("#frequency-input").val().trim();

    // Make temporary local object to store train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Push temp local obj data to firebase
    database.ref().push(newTrain);

    // Console log everything to log
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train added successully!");

    // Clear all the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});