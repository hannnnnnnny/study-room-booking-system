import test from 'node:test'
import assert from 'node:assert/strict'

import {
  cancelStudentReservation,
  createReservation,
  filterMachines,
  getInitialMachines,
  getStudentReservation,
  getTodayDateInput,
  hydrateMachines,
  summarizeMachines
} from './bookingData.js'

test('a student can reserve one available computer', () => {
  const result = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:00 PM',
    studentId: 'abc123'
  })

  assert.equal(result.ok, true)
  assert.equal(result.reservation.studentId, 'ABC123')
  assert.equal(result.reservation.machineId, 'CSC-L0-01')
})

test('a student cannot hold a second active reservation', () => {
  const first = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:00 PM',
    studentId: 'ABC123'
  })
  const second = createReservation(first.reservations, 'CSC-L0-03', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:30 PM',
    studentId: 'ABC123'
  })

  assert.equal(second.ok, false)
  assert.match(second.error, /already has CSC-L0-01 reserved/)
})

test('another student cannot reserve an already held computer', () => {
  const first = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:00 PM',
    studentId: 'ABC123'
  })
  const second = createReservation(first.reservations, 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:30 PM',
    studentId: 'DEF456'
  })

  assert.equal(second.ok, false)
  assert.match(second.error, /not available/)
})

test('cancelling a reservation releases the machine back to available', () => {
  const first = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:00 PM',
    studentId: 'ABC123'
  })
  const cancelled = cancelStudentReservation(first.reservations, 'abc123')
  const machines = hydrateMachines(cancelled.reservations)
  const releasedMachine = machines.find((machine) => machine.id === 'CSC-L0-01')

  assert.equal(cancelled.ok, true)
  assert.equal(getStudentReservation(cancelled.reservations, 'ABC123'), null)
  assert.equal(releasedMachine.status, 'available')
})

test('filters and summary reflect active reservations', () => {
  const reservation = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '120',
    startTime: '1:00 PM',
    studentId: 'ABC123'
  })
  const machines = hydrateMachines(reservation.reservations, getInitialMachines())
  const availableInCommons = filterMachines(machines, {
    location: 'Central Study Commons',
    status: 'available'
  })
  const summary = summarizeMachines(machines)

  assert.equal(availableInCommons.some((machine) => machine.id === 'CSC-L0-01'), false)
  assert.equal(summary.total, 31)
  assert.equal(summary.available, 18)
})

test('reservation validation rejects invalid booking details', () => {
  const invalidStudent = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '1:00 PM',
    studentId: 'A'
  })
  const invalidTime = createReservation([], 'CSC-L0-01', {
    date: getTodayDateInput(),
    duration: '60',
    startTime: '9:00 AM',
    studentId: 'ABC123'
  })

  assert.equal(invalidStudent.ok, false)
  assert.match(invalidStudent.error, /valid student ID/)
  assert.equal(invalidTime.ok, false)
  assert.match(invalidTime.error, /valid start time/)
})
