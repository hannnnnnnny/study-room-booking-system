export const initialMachines = [
  { id: 'CSC-L0-01', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L0-02', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'occupied', reason: 'In use until 1:45 PM' },
  { id: 'CSC-L0-03', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L0-04', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'reserved', reason: 'Reserved until 2:00 PM' },
  { id: 'CSC-L0-05', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L0-06', location: 'Central Study Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'offline', reason: 'Network issue' },
  { id: 'CSC-L2-01', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L2-02', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L2-03', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'occupied', reason: 'In use until 2:30 PM' },
  { id: 'CSC-L2-04', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L2-05', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Standard PC', status: 'maintenance', reason: 'Service desk check' },
  { id: 'CSC-L2-06', location: 'Central Study Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L3-01', location: 'Central Study Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Window row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L3-02', location: 'Central Study Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Window row', type: 'Standard PC', status: 'occupied', reason: 'In use until 4:00 PM' },
  { id: 'CSC-L3-03', location: 'Central Study Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Central row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'CSC-L3-04', location: 'Central Study Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Central row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'ML-L1-01', location: 'Main Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'occupied', reason: 'In use until 1:30 PM' },
  { id: 'ML-L1-02', location: 'Main Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'ML-L1-03', location: 'Main Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'ML-L1-04', location: 'Main Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'offline', reason: 'Network issue' },
  { id: 'ML-L2-01', location: 'Main Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'ML-L2-02', location: 'Main Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Dual monitor PC', status: 'reserved', reason: 'Reserved until 2:15 PM' },
  { id: 'ML-L2-03', location: 'Main Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'ML-L2-04', location: 'Main Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'BLC-L2-01', location: 'Business Learning Centre', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'occupied', reason: 'In use until 3:15 PM' },
  { id: 'BLC-L2-02', location: 'Business Learning Centre', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'available', reason: 'Ready now' },
  { id: 'BLC-L2-03', location: 'Business Learning Centre', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'available', reason: 'Ready now' },
  { id: 'ESL-L3-01', location: 'Engineering Study Lab', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'available', reason: 'Ready now' },
  { id: 'ESL-L3-02', location: 'Engineering Study Lab', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'maintenance', reason: 'Software update' },
  { id: 'ESL-L3-03', location: 'Engineering Study Lab', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'available', reason: 'Ready now' },
  { id: 'ESL-L3-04', location: 'Engineering Study Lab', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'occupied', reason: 'In use until 5:00 PM' }
]

export const bookingDurations = [
  { label: '1 hour', value: '60' },
  { label: '2 hours', value: '120' },
  { label: '3 hours', value: '180' }
]

export const startTimes = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']

export function getInitialMachines() {
  return initialMachines.map((machine) => ({ ...machine }))
}

export function normalizeStudentId(studentId) {
  return String(studentId || '').trim().toUpperCase()
}

export function isValidStudentId(studentId) {
  return /^[A-Z0-9-]{4,20}$/.test(normalizeStudentId(studentId))
}

export function isAvailable(machine) {
  return machine?.status === 'available'
}

export function isServiceIssue(machine) {
  return machine?.status === 'maintenance' || machine?.status === 'offline'
}

export function machineStatusLabel(machine) {
  if (isAvailable(machine)) {
    return 'Available'
  }
  if (isServiceIssue(machine)) {
    return 'Service issue'
  }
  return 'Unavailable'
}

export function machineClass(machine) {
  if (isAvailable(machine)) {
    return 'is-available'
  }
  if (isServiceIssue(machine)) {
    return 'is-service'
  }
  return 'is-unavailable'
}

export function computerLabel(machine) {
  return `${machine.id}, ${machineStatusLabel(machine)}, ${machine.type}, ${machine.reason}`
}

export function hydrateMachines(reservations = [], baseMachines = getInitialMachines()) {
  const reservationByMachine = new Map(
    reservations.filter((reservation) => reservation.status === 'active').map((reservation) => [reservation.machineId, reservation])
  )

  return baseMachines.map((machine) => {
    const reservation = reservationByMachine.get(machine.id)
    if (!reservation) {
      return { ...machine }
    }

    return {
      ...machine,
      reservedBy: reservation.studentId,
      reservationId: reservation.id,
      status: 'reserved',
      reason: `Reserved until ${reservation.endsAtLabel}`
    }
  })
}

export function filterMachines(machines, filters = {}) {
  const search = String(filters.search || '').trim().toLowerCase()
  return machines.filter((machine) => {
    const matchesSearch =
      !search ||
      [machine.id, machine.location, machine.level, machine.area, machine.zone, machine.type]
        .join(' ')
        .toLowerCase()
        .includes(search)
    const matchesLocation = !filters.location || filters.location === 'all' || machine.location === filters.location
    const matchesLevel = !filters.level || filters.level === 'all' || machine.level === filters.level
    const matchesStatus =
      !filters.status ||
      filters.status === 'all' ||
      (filters.status === 'available' && isAvailable(machine)) ||
      (filters.status === 'unavailable' && !isAvailable(machine)) ||
      (filters.status === 'service' && isServiceIssue(machine))

    return matchesSearch && matchesLocation && matchesLevel && matchesStatus
  })
}

export function groupMachines(machines) {
  const groups = new Map()
  machines.forEach((machine) => {
    const key = `${machine.location}|${machine.level}|${machine.area}`
    if (!groups.has(key)) {
      groups.set(key, {
        area: machine.area,
        key,
        level: machine.level,
        location: machine.location,
        machines: []
      })
    }
    groups.get(key).machines.push(machine)
  })

  return Array.from(groups.values()).map((group) => ({
    ...group,
    available: group.machines.filter(isAvailable).length
  }))
}

export function summarizeMachines(machines) {
  const total = machines.length
  const available = machines.filter(isAvailable).length
  const unavailable = total - available
  const utilisation = total ? Math.round((unavailable / total) * 100) : 0

  return { total, available, unavailable, utilisation }
}

export function getStudentReservation(reservations, studentId) {
  const normalized = normalizeStudentId(studentId)
  if (!normalized) {
    return null
  }
  return reservations.find((reservation) => reservation.status === 'active' && reservation.studentId === normalized) || null
}

export function createReservation(reservations, machineId, bookingDetails, baseMachines = getInitialMachines()) {
  const studentId = normalizeStudentId(bookingDetails.studentId)
  const validationError = validateBookingDetails({ ...bookingDetails, studentId })
  if (validationError) {
    return { ok: false, error: validationError }
  }

  const machines = hydrateMachines(reservations, baseMachines)
  const machine = machines.find((item) => item.id === machineId)

  const currentReservation = getStudentReservation(reservations, studentId)
  if (currentReservation) {
    return { ok: false, error: `${studentId} already has ${currentReservation.machineId} reserved.` }
  }

  if (!machine) {
    return { ok: false, error: 'This computer was not found.' }
  }

  if (!isAvailable(machine)) {
    return { ok: false, error: `${machine.id} is not available.` }
  }

  const duration = String(bookingDetails.duration || '60')
  const startsAt = bookingDetails.startTime || startTimes[0]
  const endsAtLabel = getEndTimeLabel(startsAt, duration)
  const reservation = {
    area: machine.area,
    createdAt: new Date().toISOString(),
    date: bookingDetails.date,
    duration,
    endsAtLabel,
    id: `${studentId}-${machine.id}-${Date.now()}`,
    level: machine.level,
    location: machine.location,
    machineId: machine.id,
    startsAt,
    status: 'active',
    studentId,
    type: machine.type,
    zone: machine.zone
  }

  return { ok: true, reservation, reservations: [...reservations, reservation] }
}

export function validateBookingDetails(bookingDetails) {
  if (!isValidStudentId(bookingDetails.studentId)) {
    return 'Enter a valid student ID using 4-20 letters, numbers, or hyphens.'
  }

  if (!bookingDetails.date) {
    return 'Choose a booking date.'
  }

  if (bookingDetails.date < getTodayDateInput()) {
    return 'Choose today or a future booking date.'
  }

  if (!startTimes.includes(bookingDetails.startTime)) {
    return 'Choose a valid start time.'
  }

  if (!bookingDurations.some((option) => option.value === String(bookingDetails.duration))) {
    return 'Choose a valid booking duration.'
  }

  return ''
}

export function cancelStudentReservation(reservations, studentId) {
  const normalized = normalizeStudentId(studentId)
  const reservation = getStudentReservation(reservations, normalized)

  if (!reservation) {
    return { ok: false, error: 'No active reservation was found for this student ID.' }
  }

  return {
    ok: true,
    reservation,
    reservations: reservations.filter((item) => item.id !== reservation.id)
  }
}

export function getEndTimeLabel(startTime, duration) {
  const match = String(startTime).match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i)
  if (!match) {
    return startTime
  }

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) {
    hours += 12
  }
  if (period === 'AM' && hours === 12) {
    hours = 0
  }

  const date = new Date(2026, 0, 1, hours, minutes)
  date.setMinutes(date.getMinutes() + Number(duration || 60))
  return new Intl.DateTimeFormat('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

export function getTodayDateInput(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

export function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'en-NZ'))
}
