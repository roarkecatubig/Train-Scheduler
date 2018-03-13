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
    trainsRef = database.ref("/trains");
    var key = trainsRef.push().key;
    console.log(key);
    var update = {};
    update[key] = {
        name: name,
        destination: destination,
        frequency: frequency,
        trainArrivalTime: trainTime

    };
    var result = trainsRef.update(update);

    // database.ref("/trains").push({
    //     name: name,
    //     destination: destination,
    //     frequency: frequency,
    //     trainArrivalTime: trainTime

    // });

    // var trainIndex = {};

    // trainIndex["Name"] = name;
    // trainIndex["Destination"] = destination;
    // trainIndex["Train Time"] = trainTime;
    // trainIndex["Frequency"] = frequency;

    // trains.push(trainIndex);

    // var newTable = $("#data-view");

    // for (property1 in trainIndex) {
    //     var newTableData = $("<td>").text(trainIndex[property1]);
    //     newTable.append(newTableData);
    // };

    // $("#data-view").append(newTable)

    database.ref().on("value", function(snapshot) {
        trains = [];
        trains.push(snapshot.val());
        $("#data-view").empty();
        // var dataStuff = snapshot.val();
        // var newData = snapshot.val();
        // console.log(newData);
        // for (dataSet in newData) {
            // console.log(dataSet.val());
            // var newTableData = $("<td>").text(dataSet[property1]);
            // newTable.append(newTableData);
        // }
        var newTable = $("<tbody>");

        var lookupItem = trains[0];

        for (row in lookupItem) {
            var newRow = $("<tr>")
            var nameDis = $("<td scope='col'>").text(row[name]);
            newRow.append(nameDis);
            var destinationDis = $("<td scope='col'>").text(row[destination]);
            newRow.append(destinationDis);
            var frequencyDis = $("<td scope='col'>").text(lookupItem[frequency]);
            newRow.append(frequencyDis);

            newTable.append(newRow)
            
        }

        $("#data-view").append(newTable)

        // snapshot.forEach(function (childSnap) {
            
        //     var newTable = $("<tbody>");
        //     var dataRow = childSnap.val();
        //     for(property1 in dataRow) {
        //         var newTableData = $("<td scope='col'>").text(dataRow[property1]);
        //         newTable.append(newTableData);
        //     };
        //     $("#data-view").append(newTable)
        // });
    
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