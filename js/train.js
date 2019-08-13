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

// Pull new train from database, make new row in table
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store data in a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var timeArray = trainTime.split(":")
    var trainCurrentTime = moment()
        .hours(timeArray[0])
        .minutes(timeArray[1]);
    var maxMoment = moment.max(moment(), trainCurrentTime);
    var trainMinutes;
    var trainArrival;

    // Console log train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // Ex how to find out Next Arrival & Minutes Away
    // First train leaves at 9:00 am
    // Assume train comes every 30 min
    // Assume time is 10:27 am
    // When would next train arrive?
    // 10:30 am, 3 min away

    // Math
    // 27 - 00 = 27
    // 27 % 30 = .9 (modulus = .9 * 30 = 27)
    // 30 - 27 = 3 min away
    // 3 + 10:27 am = 10:30 am next train

    // if/ else statments for arrival train
    if (maxMoment === trainCurrentTime) {
        trainArrival = trainCurrentTime.format("hh:mm A");
        trainMinutes = trainCurrentTime.diff(moment(), "minutes");
    } else {
        // find answer for modulus, and minutes away 
        var diffTime = moment().diff(trainCurrentTime, "minutes");
        var trainRemain = diffTime % trainFrequency;
        trainMinutes = trainFrequency - trainRemain;
        // find arrival time 
        trainArrival = moment()
        .add(trainMinutes, "m")
        .format("hh:mm A");
    }
    console.log("trainMinutes:", trainMinutes);
    console.log("trainArrival:", trainArrival);

    

});