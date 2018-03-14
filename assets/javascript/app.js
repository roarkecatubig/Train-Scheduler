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
var name = "";
var destination = "";
var trainTime = "";
var frequency = "";
// var trainsRef = database.ref().child("trains");
// var key = trainsRef.push().key;

// trainsRef.on("value", function(snapshot) {
//     $("#data-view").empty();
//     for (row in snapshot.val()) {
//         var nameDis = snapshot.child("name").val();
//         var destinationDis = snapshot.child("destination").val();
//         var frequencyDis = snapshot.child("frequency").val();
//         var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td></r>");
//         $("#data-view").append(newRow)
//     }

    
// });

$("#add-train").on("click", function() {
    $("#data-view").empty();
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

    trainsRef.on("value", function(snapshot) {
        $("#data-view").empty();
        var nameDis = snapshot.child(key).child("name").val();
        var destinationDis = snapshot.child(key).child("destination").val();
        var frequencyDis = snapshot.child(key).child("frequency").val();

        var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td></r>");

        $("#data-view").append(newRow)

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