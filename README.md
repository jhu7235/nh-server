# nh-server

This is a http server for doctor calendars.

## setup
yarn

## start server
yarn start

## operation
The endpoints are setup according to resource.

To get doctors, `doctors/`
 - it should return an array of doctors

To get appointments, `appointments/?doctorId=<doctorId>&date=<date>`
 - with date being number from javascript Date object
 - it should return an array of appointments

To create appointments, `appointments/create/?doctorId=<doctorId>&firstName=<firstName>&lastName=<lastName>&kind=<kind>&date=1583356095772`
 - with date being number from javascript Date object
 - with kind be a string of 'kind' or 'follow'
 - it should return the new appointment id
 
 To delete appointments, `/delete/<appointmentId>`
 - it should return 200

It only uses GET request since there was not enough time to QA those endpoints with DELETE and POST requests