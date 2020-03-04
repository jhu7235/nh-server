var express = require('express');
var router = express.Router();
const {appointments} = require('./../mock-db/index')

// number of ms in one day
const DAY_MS = 86400000;

/**
 * helper function to convert number to date time at midnight
 * @param {number} date 
 */
function numberToMidnight(date) {
  const dateObj = new Date(date);
  return Date.parse(dateObj) - Date.parse(dateObj) % DAY_MS;
}

class InvalidateDateError extends Error {
}

class DoctorUnavailableError extends Error {

}


/**
 * check date is on 15 minute interval
 * throws InvalidateDateError
 * @param {number} date 
 */
function validateDate(date) {
  // throw new InvalidateDateError();
}

function checkAvailability() {
  // throw new DoctorUnavailableError();
}

/* GET appointments by date and doctor. */
router.get('/', function(req, res, next) {
  // doctorId as string
  // date as number
  const {doctorId, date} = req.query;
  const cleanedDate = numberToMidnight(Number(date));

  // usually uses async await because should be async
  const targetAppointments = appointments.list(doctorId, cleanedDate);
  res.send(targetAppointments);
});

/* Delete appointment. */
// user get for now for easier qa
router.get('/delete/:appointmentId', function(req, res, next) {
  const {appointmentId} = req.params;
  // usually uses async await because should be async
  appointments.delete(appointmentId);
  res.send();
});

/* Create appointment. */
// user get for now for easier qa, else data should be received in payload
router.get('/create', function(req, res, next) {
  try {
    // doctorId as string
    // date as number
    const {doctorId, firstName, lastName, kind, date} = req.query;
  
    validateDate(date);
    checkAvailability(doctorId,date);
    
    // usually uses async await because should be async
    const appointment = appointments.create(firstName, lastName, doctorId, kind);
    console.log(appointment);
    
    res.send(appointment.id);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
