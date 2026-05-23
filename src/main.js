import {
  cancelStudentReservation,
  createReservation,
  filterMachines,
  getEndTimeLabel,
  getStudentReservation,
  getTodayDateInput,
  hydrateMachines,
  summarizeMachines
} from './bookingData.js'
import { readReservations, writeReservations } from './bookingStore.js'

const currentDate = document.querySelector('#currentDate')
const bookingForm = document.querySelector('#bookingForm')
const bookingDate = document.querySelector('#bookingDate')
const locationSelect = document.querySelector('#locationSelect')
const startTimeSelect = document.querySelector('#startTimeSelect')
const durationSelect = document.querySelector('#durationSelect')
const studentIdInput = document.querySelector('#studentIdInput')
const bookingMessage = document.querySelector('#bookingMessage')
const bookingResults = document.querySelector('#bookingResults')
const bookingResultsTitle = document.querySelector('#bookingResultsTitle')
const bookingResultGrid = document.querySelector('#bookingResultGrid')
const currentBookingCard = document.querySelector('#currentBookingCard')
const currentBookingTitle = document.querySelector('#currentBookingTitle')
const currentBookingMeta = document.querySelector('#currentBookingMeta')
const cancelCurrentBooking = document.querySelector('#cancelCurrentBooking')
const availableNowCount = document.querySelector('#availableNowCount')

let reservations = readReservations()

if (currentDate) {
  currentDate.textContent = new Intl.DateTimeFormat('en-NZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())
}

if (bookingDate) {
  const today = getTodayDateInput()
  bookingDate.min = today
  bookingDate.value = today
}

refreshHomepage()

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity()
    return
  }
  renderAvailableComputers()
})

studentIdInput?.addEventListener('input', () => {
  renderCurrentReservation()
})

cancelCurrentBooking?.addEventListener('click', () => {
  const result = cancelStudentReservation(reservations, studentIdInput?.value)
  if (!result.ok) {
    showMessage(result.error, 'error')
    return
  }
  reservations = result.reservations
  writeReservations(reservations)
  refreshHomepage()
  renderAvailableComputers()
  showMessage(`${result.reservation.machineId} reservation cancelled.`, 'success')
})

function renderAvailableComputers() {
  const location = locationSelect.value
  const machines = hydrateMachines(reservations)
  const matches = filterMachines(machines, {
    location,
    status: 'available'
  })

  bookingResults.hidden = false
  bookingResultsTitle.textContent = `${matches.length} computer${matches.length === 1 ? '' : 's'} available at ${location}`
  bookingResultGrid.innerHTML = ''
  const existingReservation = getStudentReservation(reservations, studentIdInput.value)

  if (!matches.length) {
    bookingResultGrid.innerHTML = '<p class="empty-inline">No computers are available for this location right now. Try another study space or open the live map.</p>'
    showMessage('No available computers found for this location.', 'notice')
    return
  }

  matches.slice(0, 8).forEach((machine) => {
    const card = document.createElement('article')
    card.className = 'booking-result-card'
    card.innerHTML = `
      <div>
        <strong>${machine.id}</strong>
        <span>${machine.level} / ${machine.area}</span>
      </div>
      <p>${machine.type} in ${machine.zone}</p>
      <button class="reserve-result-button" type="button" data-machine-id="${machine.id}" ${existingReservation ? 'disabled' : ''}>
        ${existingReservation ? 'Already reserved' : 'Reserve'}
      </button>
    `
    bookingResultGrid.append(card)
  })

  bookingResultGrid.querySelectorAll('[data-machine-id]').forEach((button) => {
    button.addEventListener('click', () => {
      reserveComputer(button.dataset.machineId)
    })
  })

  showMessage('Choose one of the available computers below, or open the full visual map.', 'notice')
}

function reserveComputer(machineId) {
  const result = createReservation(reservations, machineId, {
    date: bookingDate.value,
    duration: durationSelect.value,
    startTime: startTimeSelect.value,
    studentId: studentIdInput.value
  })

  if (!result.ok) {
    showMessage(result.error, 'error')
    renderCurrentReservation()
    return
  }

  reservations = result.reservations
  writeReservations(reservations)
  refreshHomepage()
  renderAvailableComputers()
  showMessage(`${result.reservation.machineId} reserved until ${result.reservation.endsAtLabel}.`, 'success')
}

function refreshHomepage() {
  renderCurrentReservation()
  renderOverviewCards()
}

function renderCurrentReservation() {
  if (!currentBookingCard || !studentIdInput) {
    return
  }

  const reservation = getStudentReservation(reservations, studentIdInput.value)
  currentBookingCard.hidden = !reservation

  if (!reservation) {
    return
  }

  const durationLabel = `${Number(reservation.duration) / 60} hour${reservation.duration === '60' ? '' : 's'}`
  currentBookingTitle.textContent = reservation.machineId
  currentBookingMeta.textContent = `${reservation.location} / ${reservation.level} / ${reservation.area}. ${reservation.date} from ${reservation.startsAt} to ${reservation.endsAtLabel}, ${durationLabel}.`
}

function renderOverviewCards() {
  const machines = hydrateMachines(reservations)
  const stats = summarizeMachines(machines)
  if (availableNowCount) {
    availableNowCount.textContent = stats.available
  }

  document.querySelectorAll('[data-location-card]').forEach((card) => {
    const location = card.dataset.locationCard
    const available = filterMachines(machines, { location, status: 'available' }).length
    const summary = card.querySelector('strong')
    if (summary) {
      summary.textContent = `${available} available`
    }
  })
}

function showMessage(message, type = 'notice') {
  if (!bookingMessage) {
    return
  }
  bookingMessage.hidden = false
  bookingMessage.textContent = message
  bookingMessage.dataset.type = type
}

window.addEventListener('storage', () => {
  reservations = readReservations()
  refreshHomepage()
})

window.studyRoomBooking = {
  getEndTimeLabel,
  refreshHomepage
}
