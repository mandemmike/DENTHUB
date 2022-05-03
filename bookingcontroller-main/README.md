# BookingController

## Purpose 
The purpose of this component is to both validate booking request and pass through the confirmations to the client side. The component also works as a load checker and checks if the requests exceeds a set limit given a time window that can be modified. If request exceeds the given limit the MQTT broker gets restarted and with a short delay. The component also handles the simultaneous bookings problem by using a priority queue to validate booking requests. The queue works by pointing at the issuance of the request and validates unique request in a orderily manner.  

## Setup
- Make sure you have setup the MQTT broker see wiki(https://git.chalmers.se/courses/dit355/test-teams-formation/team-14/documentation/-/wikis/Local-MQTT-Setup)

## Setup
- 1. Git clone the repository
- 2. Cd repository directory by the terminal/cmd
- 3. Run 'npm install' inside the terminal/cmd
- 4. Run 'node main.js' inside the terminal/cmd

