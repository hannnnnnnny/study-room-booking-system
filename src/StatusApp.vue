<template>
  <section class="page-hero status-page-hero">
    <div>
      <nav class="breadcrumb hero-breadcrumb" aria-label="Breadcrumb">
        <a href="./index.html">Home</a>
        <span>Study Services</span>
        <span>Live computer status</span>
      </nav>
      <p class="eyebrow eyebrow-light">Main Campus</p>
      <h1>Study Room Computer Status</h1>
      <p>
        Click a green computer to reserve it. Each user can hold one device reservation at a time.
        Grey workstations are already in use or reserved, and gold workstations need service support.
      </p>
    </div>
    <div class="refresh-card refresh-card-hero" aria-live="polite">
      <span>Last refreshed</span>
      <strong>{{ liveUpdatedLabel }}</strong>
      <button class="secondary-button" type="button" @click="refreshStatus">Refresh</button>
    </div>
  </section>

  <div class="page-layout">
    <aside class="side-nav" aria-label="Study services navigation">
      <strong>Study Services</strong>
      <a href="./index.html">Book a study computer</a>
      <a class="active" href="./status.html">Live computer status</a>
      <a href="#boardTitle">Study space locations</a>
      <a href="#guidanceTitle">Booking guidance</a>
    </aside>

    <div class="page-content">
      <section class="status-summary" aria-label="Availability summary">
        <article>
          <span>Total computers</span>
          <strong>{{ stats.total }}</strong>
        </article>
        <article class="summary-available">
          <span>Available now</span>
          <strong>{{ stats.available }}</strong>
        </article>
        <article>
          <span>Unavailable</span>
          <strong>{{ stats.unavailable }}</strong>
        </article>
        <article>
          <span>Utilisation</span>
          <strong>{{ stats.utilisation }}%</strong>
        </article>
      </section>

      <section v-if="reservation" class="reservation-panel" aria-live="polite">
        <div>
          <p class="eyebrow">Current reservation</p>
          <h2>{{ reservation.id }}</h2>
          <p>{{ reservation.location }} / {{ reservation.level }} / {{ reservation.area }}</p>
        </div>
        <button class="secondary-button" type="button" @click="clearReservation">Cancel reservation</button>
      </section>

      <section class="status-toolbar" aria-label="Computer filters">
        <label>
          <span>Search</span>
          <input v-model="search" type="search" placeholder="PC, room, level, or workstation type" />
        </label>
        <label>
          <span>Location</span>
          <select v-model="selectedLocation">
            <option value="all">All locations</option>
            <option v-for="location in locationOptions" :key="location" :value="location">{{ location }}</option>
          </select>
        </label>
        <label>
          <span>Level</span>
          <select v-model="selectedLevel">
            <option value="all">All levels</option>
            <option v-for="level in levelOptions" :key="level" :value="level">{{ level }}</option>
          </select>
        </label>
        <label>
          <span>Status</span>
          <select v-model="selectedStatus">
            <option value="all">All statuses</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
      </section>

      <div class="legend-row" aria-label="Status legend">
        <span><i class="legend-available"></i>Click to reserve</span>
        <span><i class="legend-unavailable"></i>Unavailable</span>
        <span><i class="legend-service"></i>Service issue</span>
      </div>

      <section class="campus-board" aria-labelledby="boardTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Visual workstation map</p>
            <h2 id="boardTitle">Click a computer to reserve</h2>
          </div>
          <span>{{ filteredMachines.length }} computers shown</span>
        </div>

        <div v-if="groupedMachines.length" class="room-sections">
          <section v-for="group in groupedMachines" :key="group.key" class="room-section room-map-section">
            <div class="room-section-header">
              <div>
                <h3>{{ group.location }}</h3>
                <p>{{ group.level }} / {{ group.area }}</p>
              </div>
              <span>{{ group.available }} of {{ group.machines.length }} available</span>
            </div>

            <div class="visual-room">
              <div class="room-door">Door</div>
              <div class="computer-map" :aria-label="`${group.location} ${group.level} computer map`">
                <button
                  v-for="machine in group.machines"
                  :key="machine.id"
                  type="button"
                  class="computer-desk"
                  :class="machineClass(machine)"
                  :disabled="!isAvailable(machine)"
                  :aria-label="computerLabel(machine)"
                  :title="computerLabel(machine)"
                  @click="reserveMachine(machine)"
                >
                  <span class="monitor-shape" aria-hidden="true">
                    <span class="monitor-screen">PC</span>
                  </span>
                  <span class="desk-id">{{ machine.id }}</span>
                  <span class="desk-meta">{{ machine.zone }}</span>
                </button>
              </div>
            </div>

            <div class="room-machine-list">
              <article
                v-for="machine in group.machines"
                :key="`${machine.id}-detail`"
                class="mini-machine-card"
                :class="machineClass(machine)"
              >
                <strong>{{ machine.id }}</strong>
                <span>{{ machineStatusLabel(machine) }}</span>
                <small>{{ machine.reason }}</small>
              </article>
            </div>
          </section>
        </div>

        <section v-else class="empty-state">
          <h3>No computers match the current filters</h3>
          <p>Try another location, level, status, or search term.</p>
        </section>
      </section>

      <section class="notice-band" aria-labelledby="guidanceTitle">
        <div>
          <p class="eyebrow">Booking guidance</p>
          <h2 id="guidanceTitle">How to reserve</h2>
        </div>
        <ul>
          <li>Click any green computer icon to reserve it immediately.</li>
          <li>Each user can reserve only one device at a time.</li>
          <li>The selected computer changes to reserved and is removed from available count.</li>
          <li>Use the filters to find a computer by room, level, workstation type, or status.</li>
        </ul>
      </section>
    </div>
  </div>

  <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const initialMachines = [
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

const machines = ref(initialMachines.map((machine) => ({ ...machine })))
const search = ref('')
const selectedLocation = ref('all')
const selectedLevel = ref('all')
const selectedStatus = ref('all')
const liveUpdatedAt = ref(new Date())
const reservation = ref(null)
const toastMessage = ref('')
let clockTimer
let toastTimer

const liveUpdatedLabel = computed(() => formatTime(liveUpdatedAt.value))

const locationOptions = computed(() => uniqueSorted(machines.value.map((machine) => machine.location)))
const levelOptions = computed(() => uniqueSorted(machines.value.map((machine) => machine.level)))

const filteredMachines = computed(() => {
  const text = search.value.trim().toLowerCase()
  return machines.value.filter((machine) => {
    const matchesSearch =
      !text ||
      [machine.id, machine.location, machine.level, machine.area, machine.zone, machine.type]
        .join(' ')
        .toLowerCase()
        .includes(text)
    const matchesLocation = selectedLocation.value === 'all' || machine.location === selectedLocation.value
    const matchesLevel = selectedLevel.value === 'all' || machine.level === selectedLevel.value
    const matchesStatus =
      selectedStatus.value === 'all' ||
      (selectedStatus.value === 'available' && isAvailable(machine)) ||
      (selectedStatus.value === 'unavailable' && !isAvailable(machine))

    return matchesSearch && matchesLocation && matchesLevel && matchesStatus
  })
})

const groupedMachines = computed(() => {
  const groups = new Map()
  filteredMachines.value.forEach((machine) => {
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
})

const stats = computed(() => {
  const total = machines.value.length
  const available = machines.value.filter(isAvailable).length
  const unavailable = total - available
  const utilisation = total ? Math.round((unavailable / total) * 100) : 0

  return { total, available, unavailable, utilisation }
})

onMounted(() => {
  updateHeaderClock()
  clockTimer = window.setInterval(() => {
    liveUpdatedAt.value = new Date()
    updateHeaderClock()
  }, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(clockTimer)
  window.clearTimeout(toastTimer)
})

function reserveMachine(machine) {
  if (!isAvailable(machine)) {
    return
  }

  if (reservation.value) {
    showToast(`You already reserved ${reservation.value.id}. Cancel it before choosing another device.`)
    return
  }

  machine.status = 'reserved'
  machine.reason = 'Reserved for your next session'
  reservation.value = { ...machine }
  liveUpdatedAt.value = new Date()
  showToast(`${machine.id} has been reserved.`)
}

function clearReservation() {
  if (!reservation.value) {
    return
  }

  const machine = machines.value.find((item) => item.id === reservation.value.id)
  if (machine) {
    machine.status = 'available'
    machine.reason = 'Ready now'
  }

  showToast(`${reservation.value.id} reservation was cancelled.`)
  reservation.value = null
  liveUpdatedAt.value = new Date()
}

function refreshStatus() {
  liveUpdatedAt.value = new Date()
  showToast('Computer status has been refreshed.')
}

function showToast(message) {
  window.clearTimeout(toastTimer)
  toastMessage.value = message
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 3200)
}

function isAvailable(machine) {
  return machine.status === 'available'
}

function isServiceIssue(machine) {
  return machine.status === 'maintenance' || machine.status === 'offline'
}

function machineStatusLabel(machine) {
  if (isAvailable(machine)) {
    return 'Available'
  }
  if (isServiceIssue(machine)) {
    return 'Service issue'
  }
  return 'Unavailable'
}

function machineClass(machine) {
  if (isAvailable(machine)) {
    return 'is-available'
  }
  if (isServiceIssue(machine)) {
    return 'is-service'
  }
  return 'is-unavailable'
}

function computerLabel(machine) {
  return `${machine.id}, ${machineStatusLabel(machine)}, ${machine.type}, ${machine.reason}`
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }).format(date)
}

function updateHeaderClock() {
  const statusClock = document.querySelector('#statusClock')
  if (statusClock) {
    statusClock.textContent = formatTime(new Date())
  }
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'en-NZ'))
}
</script>
