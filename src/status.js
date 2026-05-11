const machines = [
  { id: 'KEIC-L0-01', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L0-02', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'occupied', reason: 'In use until 1:45 PM' },
  { id: 'KEIC-L0-03', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'North row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L0-04', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'reserved', reason: 'Reserved until 2:00 PM' },
  { id: 'KEIC-L0-05', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L0-06', location: 'Kate Edger Information Commons', level: 'Level 0', area: 'Lower commons', zone: 'South row', type: 'Standard PC', status: 'offline', reason: 'Network issue' },
  { id: 'KEIC-L2-01', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L2-02', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L2-03', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'East row', type: 'Dual monitor PC', status: 'occupied', reason: 'In use until 2:30 PM' },
  { id: 'KEIC-L2-04', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L2-05', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Standard PC', status: 'maintenance', reason: 'Service desk check' },
  { id: 'KEIC-L2-06', location: 'Kate Edger Information Commons', level: 'Level 2', area: 'Silent study room', zone: 'West row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L3-01', location: 'Kate Edger Information Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Window row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L3-02', location: 'Kate Edger Information Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Window row', type: 'Standard PC', status: 'occupied', reason: 'In use until 4:00 PM' },
  { id: 'KEIC-L3-03', location: 'Kate Edger Information Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Central row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'KEIC-L3-04', location: 'Kate Edger Information Commons', level: 'Level 3', area: 'Quiet study room', zone: 'Central row', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'GL-L1-01', location: 'General Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'occupied', reason: 'In use until 1:30 PM' },
  { id: 'GL-L1-02', location: 'General Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'GL-L1-03', location: 'General Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'GL-L1-04', location: 'General Library', level: 'Level 1', area: 'Learning commons', zone: 'Individual study', type: 'Standard PC', status: 'offline', reason: 'Network issue' },
  { id: 'GL-L2-01', location: 'General Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Dual monitor PC', status: 'available', reason: 'Ready now' },
  { id: 'GL-L2-02', location: 'General Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Dual monitor PC', status: 'reserved', reason: 'Reserved until 2:15 PM' },
  { id: 'GL-L2-03', location: 'General Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'GL-L2-04', location: 'General Library', level: 'Level 2', area: 'South study room', zone: 'Postgraduate study', type: 'Standard PC', status: 'available', reason: 'Ready now' },
  { id: 'OGGB-L2-01', location: 'Owen G Glenn Building', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'occupied', reason: 'In use until 3:15 PM' },
  { id: 'OGGB-L2-02', location: 'Owen G Glenn Building', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'available', reason: 'Ready now' },
  { id: 'OGGB-L2-03', location: 'Owen G Glenn Building', level: 'Level 2', area: 'Computer lab 240A', zone: 'Business study', type: 'Finance workstation', status: 'available', reason: 'Ready now' },
  { id: 'ENG405-L3-01', location: 'Engineering Building 405', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'available', reason: 'Ready now' },
  { id: 'ENG405-L3-02', location: 'Engineering Building 405', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'maintenance', reason: 'Software update' },
  { id: 'ENG405-L3-03', location: 'Engineering Building 405', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'available', reason: 'Ready now' },
  { id: 'ENG405-L3-04', location: 'Engineering Building 405', level: 'Level 3', area: 'Collaboration room', zone: 'Project work', type: 'CAD workstation', status: 'occupied', reason: 'In use until 5:00 PM' }
]

const elements = {
  availableCount: document.querySelector('#availableCount'),
  bookingToast: document.querySelector('#bookingToast'),
  lastUpdated: document.querySelector('#lastUpdated'),
  levelFilter: document.querySelector('#levelFilter'),
  locationFilter: document.querySelector('#locationFilter'),
  refreshButton: document.querySelector('#refreshButton'),
  roomSections: document.querySelector('#roomSections'),
  searchInput: document.querySelector('#searchInput'),
  statusClock: document.querySelector('#statusClock'),
  statusFilter: document.querySelector('#statusFilter'),
  totalCount: document.querySelector('#totalCount'),
  unavailableCount: document.querySelector('#unavailableCount'),
  utilisationCount: document.querySelector('#utilisationCount'),
  visibleCount: document.querySelector('#visibleCount')
}

function isAvailable(machine) {
  return machine.status === 'available'
}

function isServiceIssue(machine) {
  return machine.status === 'maintenance' || machine.status === 'offline'
}

function displayStatus(machine) {
  return isAvailable(machine) ? 'Available' : 'Unavailable'
}

function statusClass(machine) {
  if (isAvailable(machine)) {
    return 'is-available'
  }
  return isServiceIssue(machine) ? 'is-service' : 'is-unavailable'
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'en-NZ'))
}

function fillFilters() {
  uniqueSorted(machines.map((machine) => machine.location)).forEach((location) => {
    elements.locationFilter.add(new Option(location, location))
  })

  uniqueSorted(machines.map((machine) => machine.level)).forEach((level) => {
    elements.levelFilter.add(new Option(level, level))
  })
}

function getFilteredMachines() {
  const search = elements.searchInput.value.trim().toLowerCase()
  const location = elements.locationFilter.value
  const level = elements.levelFilter.value
  const status = elements.statusFilter.value

  return machines.filter((machine) => {
    const matchesSearch =
      !search ||
      [machine.id, machine.location, machine.level, machine.area, machine.zone, machine.type]
        .join(' ')
        .toLowerCase()
        .includes(search)
    const matchesLocation = location === 'all' || machine.location === location
    const matchesLevel = level === 'all' || machine.level === level
    const matchesStatus =
      status === 'all' ||
      (status === 'available' && isAvailable(machine)) ||
      (status === 'unavailable' && !isAvailable(machine))

    return matchesSearch && matchesLocation && matchesLevel && matchesStatus
  })
}

function groupMachines(filteredMachines) {
  const groups = new Map()
  filteredMachines.forEach((machine) => {
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
  return [...groups.values()]
}

function renderSummary() {
  const total = machines.length
  const available = machines.filter(isAvailable).length
  const unavailable = total - available
  const utilisation = Math.round((unavailable / total) * 100)

  elements.totalCount.textContent = total
  elements.availableCount.textContent = available
  elements.unavailableCount.textContent = unavailable
  elements.utilisationCount.textContent = `${utilisation}%`
}

function renderBoard() {
  const filteredMachines = getFilteredMachines()
  const groups = groupMachines(filteredMachines)

  elements.visibleCount.textContent = `${filteredMachines.length} computers shown`

  if (!groups.length) {
    elements.roomSections.innerHTML = `
      <section class="empty-state">
        <h3>No computers match the current filters</h3>
        <p>Try another location, level, status, or search term.</p>
      </section>
    `
    return
  }

  elements.roomSections.innerHTML = groups
    .map((group) => {
      const available = group.machines.filter(isAvailable).length
      return `
        <section class="room-section">
          <div class="room-section-header">
            <div>
              <h3>${group.location}</h3>
              <p>${group.level} / ${group.area}</p>
            </div>
            <span>${available} of ${group.machines.length} available</span>
          </div>
          <div class="computer-grid">
            ${group.machines.map(renderMachineCard).join('')}
          </div>
        </section>
      `
    })
    .join('')
}

function renderMachineCard(machine) {
  const buttonText = isAvailable(machine) ? 'Reserve' : isServiceIssue(machine) ? 'Service issue' : 'Unavailable'
  const disabled = isAvailable(machine) ? '' : 'disabled'

  return `
    <article class="computer-card ${statusClass(machine)}">
      <div class="computer-card-top">
        <span class="computer-id">${machine.id}</span>
        <span class="status-chip">${displayStatus(machine)}</span>
      </div>
      <p>${machine.zone}</p>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>${machine.type}</dd>
        </div>
        <div>
          <dt>Reason</dt>
          <dd>${machine.reason}</dd>
        </div>
      </dl>
      <button class="reserve-button" type="button" data-reserve="${machine.id}" ${disabled}>${buttonText}</button>
    </article>
  `
}

function render() {
  renderSummary()
  renderBoard()
  updateTimestamps()
}

function updateTimestamps() {
  const now = new Date()
  const time = new Intl.DateTimeFormat('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }).format(now)

  elements.lastUpdated.textContent = time
  elements.statusClock.textContent = time
}

function reserveMachine(machineId) {
  const machine = machines.find((item) => item.id === machineId)
  if (!machine || !isAvailable(machine)) {
    return
  }

  machine.status = 'reserved'
  machine.reason = 'Reserved for your next session'
  render()
  showToast(`${machine.id} has been held for your booking.`)
}

function showToast(message) {
  elements.bookingToast.textContent = message
  elements.bookingToast.hidden = false
  window.setTimeout(() => {
    elements.bookingToast.hidden = true
  }, 3200)
}

function applyLiveShift() {
  const liveCandidates = machines.filter((machine) => !isServiceIssue(machine) && machine.reason !== 'Reserved for your next session')
  const machine = liveCandidates[Math.floor(Math.random() * liveCandidates.length)]
  if (!machine) {
    return
  }

  if (machine.status === 'available') {
    machine.status = 'occupied'
    machine.reason = 'In use until the next refresh window'
  } else {
    machine.status = 'available'
    machine.reason = 'Ready now'
  }
  render()
}

elements.refreshButton.addEventListener('click', render)
elements.searchInput.addEventListener('input', renderBoard)
elements.locationFilter.addEventListener('change', renderBoard)
elements.levelFilter.addEventListener('change', renderBoard)
elements.statusFilter.addEventListener('change', renderBoard)
elements.roomSections.addEventListener('click', (event) => {
  const reserveButton = event.target.closest('[data-reserve]')
  if (reserveButton) {
    reserveMachine(reserveButton.dataset.reserve)
  }
})

fillFilters()
render()
window.setInterval(updateTimestamps, 1000)
window.setInterval(applyLiveShift, 30000)
