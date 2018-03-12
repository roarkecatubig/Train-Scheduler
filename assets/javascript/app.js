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
var trains = [];
var name = "";
var destination = "";
var trainTime = "";
var frequency = "";

$("#add-train").on("click", function() {
    event.preventDefault();

    name = $("#name-input").val();
    destination = $("#destination-input").val();
    trainTime = $("#time-input").val();
    frequency = $("#frequency-input").val();

    database.ref().push({
        name: name,
        destination: destination,
        trainArrivalTime: trainTime,
        frequency: frequency
    });

    var trainIndex = {};

    trainIndex["Name"] = name;
    trainIndex["Destination"] = destination;
    trainIndex["Train Time"] = trainTime;
    trainIndex["Frequency"] = frequency;

    trains.push(trainIndex);

    // var newTable = $("#data-view");

    // for (property1 in trainIndex) {
    //     var newTableData = $("<td>").text(trainIndex[property1]);
    //     newTable.append(newTableData);
    // };

    // $("#data-view").append(newTable)

    database.ref().on("value", function(snapshot) {
        $("#data-view").empty();
        // var dataStuff = snapshot.val();
        // var newData = snapshot.val();
        // console.log(newData);
        // for (dataSet in newData) {
            // console.log(dataSet.val());
            // var newTableData = $("<td>").text(dataSet[property1]);
            // newTable.append(newTableData);
        // }
        snapshot.forEach(function (childSnap) {
            var newTable = $("<tbody>");
            var dataRow = childSnap.val();
            for(property1 in dataRow) {
                var newTableData = $("<td>").text(dataRow[property1]);
                newTable.append(newTableData);
            };
            $("#data-view").append(newTable)
        });
    
    });
});
  
        




//     database.ref().on("value", function(snapshot) {
//     $("#name-display").text(snapshot.val().name);
//     $("#destination-display").text(snapshot.val().destination);
//     $("#frequency-display").text(snapshot.val().frequency);
//     $("#time-display").text(snapshot.val().trainTime);

//         }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

    // displayTable()


// function displayTable() {

//     for (i=0; i < trains.length; i++) {
//         var newTable = $("<tbody>")
//         for (property1 in trains[i]) {
//             var newTableData = $("<td>").text(property1);
//             newTable.append(newTableData);
//         }
//     }

//     $("#data-view").append(newTable)
// }

// database.ref().on("value", function(snapshot) {
//     $("#name-display").text(snapshot.val().name);
//     $("#destination-display").text(snapshot.val().destination);
//     $("#frequency-display").text(snapshot.val().frequency);
//     $("#time-display").text(snapshot.val().trainTime);

//         }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });