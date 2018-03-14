var config = {
    apiKey: "AIzaSyBeoLqTvN1G0y43AroKGFPfDZQWuHWKksc",
    authDomain: "train-scheduler-d2e3c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d2e3c.firebaseio.com",
    projectId: "train-scheduler-d2e3c",
    storageBucket: "train-scheduler-d2e3c.appspot.com",
    messagingSenderId: "568686695836"
  };

firebase.initializeApp(config);

var database = firebase.database();
var trainsRef = database.ref();
var name = "";
var destination = "";
var trainTime = "";
var convertedTT = "";
var currentTime = "";
var timeDiff = "";
var tRemainder ="";
var timeWait = "";
var nextTT = "";
var nextTTF = "";
var frequency = "";
var newDataPoint = "";

$("#add-train").on("click", function() {
    
    event.preventDefault();
    
    // Form input stored to variables.
    name = $("#name-input").val();
    destination = $("#destination-input").val();
    trainTime = $("#time-input").val();
    frequency = $("#frequency-input").val();

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    // Convert inputted "trainTime" variable into readable format.
    convertedTT = moment(trainTime, "HH:mm").format("HH:mm");
    console.log("First Train Time: " + convertedTT);

    // Getting current time.
    currentTime = moment().format("HH:mm");
    console.log("Current Time: " + currentTime);

    // timeDiff = moment(currentTime, "HH:mm").diff(moment(convertedTT, "HH:mm"));
    timeDiff = moment().diff(moment(convertedTT, "HH:mm"), "minutes")
    console.log("Time difference: " + timeDiff);

    tRemainder = timeDiff % frequency;
    console.log("tRemainder: " + tRemainder)

    timeWait = frequency - tRemainder;
    console.log("Wait Time: " + timeWait);

    nextTT = moment().add(timeWait, "minutes");
    console.log("(Unformatted) Next Train Time: " + timeWait);

    nextTTF = moment(nextTT).format("hh:mm a")
    console.log("(Formatted) Next Train Time: " + nextTTF)

    // Difference between the first "trainTime" variable and current time
    newDataPoint = trainsRef.push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        currentTime: currentTime,
        nextTrain: nextTTF,
        waitTime: timeWait
    });

    return false;
});


trainsRef.on("child_added", function(childSnapshot) {
    var nameDis = childSnapshot.val().name;
    var destinationDis = childSnapshot.val().destination;
    var frequencyDis = childSnapshot.val().frequency;
    var nextTrainDis = childSnapshot.val().nextTrain;
    var waitDis = childSnapshot.val().waitTime;

    var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td><td>" + nextTrainDis + "</td><td>" + timeWait + "<td></tr>");
    // var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td><td>" + nextTrainDis + "</td><td>" + waitDis + "</td></tr>");

    $("#data-view").append(newRow)


});


