# AppointmentFinder

## Purpose 
The purpose of the AppointmentFinder is to recieve mqtt messages in the form of a  date from the client, and query the dentist registry for available timeslots at that specific date. The component checks for available timeslots by querying the database and by additional nodejs libraries that creates a response object with available timeslots. 

## Pre-Setup
- Make sure you have setup the MQTT broker see wiki(https://git.chalmers.se/courses/dit355/test-teams-formation/team-14/documentation/-/wikis/Local-MQTT-Setup)

## Setup
- 1. Clone repository 
- 2. Cd directory in terminal/cmd
- 3. Run the command 'npm install' inside terminal/cmd
- 4. Run the commande 'node main.js' inside terminal/cmd
  
