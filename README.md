# Train-Scheduler

This project is designed to take user input as far as the train name, destination first occurrence of the day when the specified train arrives and the frequency the train arrives at a station. 

After the user fills out the appropriate fields and submits the form, the table automatically appends the user inputted information along with the next available train time and the current wait time until that train. User data is inputted into a firebase database and the site pulls object properties from the firebase database to display train informationThis project incorporates the moment.js script file to more easily access real time data and format at moments in time as needed for the purposes of this project. 

Note: This site does not have incorporated functionality to update wait times and next available train in as time gradually goes on during the day. The site only presents accurate information at that moment in time. Refreshing the page will not display updated train and wait times. 