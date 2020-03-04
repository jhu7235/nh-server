/**
 * @author Jason Hu
 */

const mockDoctors = {
  doctor1: {
    firstName: 'Ally',
    lastName: 'Jean'
  },
  doctor2: {
    firstName: 'Billy',
    lastName: 'Jean'
  },
  doctor3: {
    firstName: 'Cindy',
    lastName: 'Jean'
  },
  doctor4: {
    firstName: 'Dolly',
    lastName: 'Jean'
  },
}

// number of ms in one day
const DAY_MS = 86400000;


const mockAppointments = {
  appointment1: {
    firstName: 'patient1',
    lastName: 'Jean',
    date: Date.now() + 1,
    kind: 'new',
    doctor: 'doctor1'
  },
  appointment2: {
    firstName: 'patient2',
    lastName: 'Jean',
    date: Date.now() + 2,
    kind: 'new',
    doctor: 'doctor2'
  },
  appointment3: {
    firstName: 'patient3',
    lastName: 'Jean',
    date: Date.now() + 3,
    kind: 'new',
    doctor: 'doctor3'
  },
  appointment4: {
    firstName: 'patient4',
    lastName: 'Jean',
    date: Date.now() + 4,
    kind: 'new',
    doctor: 'doctor4'
  },
  appointment5: {
    firstName: 'patient5',
    lastName: 'Jean',
    date: Date.now() + 5,
    kind: 'follow',
    doctor: 'doctor1'
  },
  appointment6: {
    firstName: 'patient6',
    lastName: 'Jean',
    date: Date.now() + 6,
    kind: 'follow',
    doctor: 'doctor2'
  },
}

/**
 * maps doctors to appointments
 */
const doctorAppointmentIndex = {
}

function initAppointmentDoctorIndex() {
  for (let appointmentId in mockAppointments) {
    const doctorId = mockAppointments[appointmentId].doctor;
    if (!doctorAppointmentIndex[doctorId]) {
      doctorAppointmentIndex[doctorId] = []
    }
    doctorAppointmentIndex[doctorId].push(appointmentId)
  }
}

initAppointmentDoctorIndex();

class ModelBase {
    /**
   * helper function converts key-value map to arrays
   */
  _toArray(documents) {
    const documentArray = [];
    for (let id in documents) {
      console.log(documents);
      
      documentArray.push({ id, ...documents[id] });
    }
    return documentArray;
  }
}

class Doctors extends ModelBase{
  get(id) {
  }
  
  create(id) {
  }

  delete(id) {
  }

  /**
   * lists all doctors
   */
  list() {
    return this._toArray(mockDoctors);
  }

  update(id) { }
}

class Appointments extends ModelBase {
  get(id) {
    // TODO: use a serialization/parsing method
    return {id, ...mockAppointments[id]} || null;
  }

  /**
   * Creates a new appointment and updates doctorAppointmentIndex
   * @param {string} firstName 
   * @param {string} lastName 
   * @param {string} doctorId 
   * @param {string} kind 
   */
  create(firstName, lastName, doctorId, kind = 'new', date) {
    // using patient with large random number, had trouble installing uuid
    const id = `patient${Math.floor(Math.random()*1000000000000000)}`
    // assumes not possible to collide
    if (!mockAppointments[id]) {
      mockAppointments[id] = {
        firstName,
        lastName,
        date,
        kind,
        doctor: doctorId
      }
    }
    // assumes doctor exists
    doctorAppointmentIndex[doctorId].push(id);
    return {id, ...mockAppointments[id]};
  }

  /**
   * delete an appointment and cleans up index in doctorAppointmentIndex
   * @param {string} id 
   */
  delete(id) {
    console.log('deleting', id);
    const appointment = mockAppointments[id];
    const doctorId = appointment.doctor;
    delete mockAppointments[id];
    doctorAppointmentIndex[doctorId] = doctorAppointmentIndex[doctorId].filter(appointmentId => 
      appointmentId !== id
    );
  }

  /**
   * list all appointments for a doctor for a particular date. Assumes date is midnight of date
   * @param {string} doctorId 
   * @param {number} date 
   */
  list(doctorId, date) {
    const appointments = doctorAppointmentIndex[doctorId].map(appointmentId => this.get(appointmentId));
    
    const appointmentsOnDate = appointments
      .filter(appointment =>  appointment.date > date && appointment.date < new Date(date + DAY_MS));
    return this._toArray(appointmentsOnDate);
  }

  update(id) { }
}

module.exports = {
  doctors: new Doctors(),
  appointments: new Appointments(),
}
