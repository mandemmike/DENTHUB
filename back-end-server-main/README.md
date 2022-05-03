# Back-End-Server

## Purpose
The purpose of the back end server component is to hold the actual dentist registry through the persistent data by mongoDB. The server works as a traditional back-end in some sense by defining the dentist clinic entity and therefore work as our dentist registry. The component also handles the appointment bookings by encapsulating the booking information inside the appointment model schema and validates the booking requests recived through the mqtt broker. The component directly communicates with the booking-controller and front-end client. The communication between the server and client is just HTTP request for information that needs to be available on load time(Coordinates of dentist clinics etc). The communication exchanged with the booking controller is where the server recieves booking requests and validates them inside its own mqtt client. When a booking gets validates it sends a confirmation object back to booking controller which passes it own to the representation i.e the client and informs the user that their booking is confirmed. 

## Pre-Setup
- Make sure you have setup the MQTT broker see wiki(https://git.chalmers.se/courses/dit355/test-teams-formation/team-14/documentation/-/wikis/Local-MQTT-Setup)
- Install mongoDB Community Server (https://docs.mongodb.com/manual/administration/install-community/)

## Setup
- 1. Git clone the repository
- 2. Cd repository directory by the terminal/cmd
- 3. Run 'npm install' inside the terminal/cmd
- 4. Run 'npm start serve' inside the terminal/cmd
