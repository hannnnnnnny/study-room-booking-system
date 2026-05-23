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
        Enter a student ID, choose a time, then click a green computer to reserve it.
        Each student ID can hold one active device reservation at a time.
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
          <p class="eyebrow">Current reservation for {{ reservation.studentId }}</p>
          <h2>{{ reservation.machineId }}</h2>
          <p>
            {{ reservation.location }} / {{ reservation.level }} / {{ reservation.area }}.
            {{ reservation.date }} from {{ reservation.startsAt }} to {{ reservation.endsAtLabel }}.
          </p>
        </div>
        <button class="secondary-button" type="button" @click="clearReservation">Cancel reservation</button>
      </section>

      <section class="interaction-panel" aria-label="Interactive controls">
        <div class="quick-filter-panel">
          <div>
            <p class="eyebrow">Reservation details</p>
            <h2>Find and reserve a computer</h2>
          </div>

          <div class="reservation-form-grid">
            <label>
              <span>Student ID</span>
              <input
                v-model="studentId"
                autocomplete="off"
                maxlength="20"
                minlength="4"
                pattern="[A-Za-z0-9-]{4,20}"
                placeholder="Enter your student ID"
                type="text"
              />
            </label>
            <label>
              <span>Date</span>
              <input v-model="bookingDate" :min="today" type="date" />
            </label>
            <label>
              <span>Start time</span>
              <select v-model="startTime">
                <option v-for="time in startTimes" :key="time" :value="time">{{ time }}</option>
              </select>
            </label>
            <label>
              <span>Duration</span>
              <select v-model="duration">
                <option v-for="option in bookingDurations" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>

          <p class="identity-note">
            The same student ID cannot reserve a second computer until the current reservation is cancelled.
          </p>

          <div class="quick-actions" aria-label="Quick status filters">
            <button
              v-for="filter in quickStatusFilters"
              :key="filter.value"
              type="button"
              class="filter-chip"
              :class="{ active: selectedStatus === filter.value }"
              @click="setStatusFilter(filter.value)"
            >
              {{ filter.label }}
            </button>
          </div>
          <div class="utility-actions">
            <button class="secondary-button" type="button" @click="findNextAvailable">Find next available</button>
            <button class="secondary-button" type="button" @click="clearFilters">Clear filters</button>
          </div>
        </div>

        <aside class="machine-detail-panel" aria-live="polite">
          <template v-if="selectedMachine">
            <div class="machine-detail-heading">
              <div>
                <p class="eyebrow">Selected computer</p>
                <h2>{{ selectedMachine.id }}</h2>
              </div>
              <span class="detail-status" :class="machineClass(selectedMachine)">
                {{ machineStatusLabel(selectedMachine) }}
              </span>
            </div>
            <dl class="detail-list">
              <div>
                <dt>Location</dt>
                <dd>{{ selectedMachine.location }}</dd>
              </div>
              <div>
                <dt>Room</dt>
                <dd>{{ selectedMachine.level }} / {{ selectedMachine.area }}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{{ selectedMachine.type }}</dd>
              </div>
              <div>
                <dt>Status note</dt>
                <dd>{{ selectedMachine.reason }}</dd>
              </div>
            </dl>
            <button
              v-if="isAvailable(selectedMachine)"
              class="primary-button detail-action"
              type="button"
              @click="reserveSelectedMachine"
            >
              Reserve this computer
            </button>
            <button
              v-else-if="canCancelSelected"
              class="secondary-button detail-action"
              type="button"
              @click="clearReservation"
            >
              Cancel this reservation
            </button>
          </template>
          <template v-else>
            <p class="eyebrow">Selected computer</p>
            <h2>No computer selected</h2>
            <p>Click any workstation on the visual map to view its details.</p>
          </template>
        </aside>
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
            <option value="service">Service issue</option>
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
                  :class="[machineClass(machine), { selected: selectedMachine?.id === machine.id }]"
                  :data-machine-id="machine.id"
                  :aria-label="computerLabel(machine)"
                  :title="computerLabel(machine)"
                  @click="handleComputerClick(machine)"
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
              <button
                v-for="machine in group.machines"
                :key="`${machine.id}-detail`"
                type="button"
                class="mini-machine-card"
                :class="[machineClass(machine), { selected: selectedMachine?.id === machine.id }]"
                @click="selectMachine(machine)"
              >
                <strong>{{ machine.id }}</strong>
                <span>{{ machineStatusLabel(machine) }}</span>
                <small>{{ machine.reason }}</small>
              </button>
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
          <li>Enter a valid student ID before reserving.</li>
          <li>Click any green computer icon to reserve it for the selected time.</li>
          <li>Each student ID can reserve only one device at a time.</li>
          <li>Use filters to search by room, level, workstation type, or status.</li>
        </ul>
      </section>

      <section class="activity-panel" aria-labelledby="activityTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Recent activity</p>
            <h2 id="activityTitle">Session log</h2>
          </div>
          <button class="secondary-button compact-button" type="button" @click="clearActivity">Clear log</button>
        </div>
        <ol>
          <li v-for="item in activityLog" :key="item.id">
            <time>{{ item.time }}</time>
            <span>{{ item.text }}</span>
          </li>
        </ol>
      </section>
    </div>
  </div>

  <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  bookingDurations,
  cancelStudentReservation,
  computerLabel,
  createReservation,
  filterMachines,
  getStudentReservation,
  getTodayDateInput,
  groupMachines,
  hydrateMachines,
  isAvailable,
  machineClass,
  machineStatusLabel,
  normalizeStudentId,
  startTimes,
  summarizeMachines,
  uniqueSorted
} from './bookingData.js'
import { readReservations, writeReservations } from './bookingStore.js'

const LAST_STUDENT_ID_KEY = 'study-room-booking.lastStudentId'

const reservations = ref(readReservations())
const studentId = ref(window.localStorage.getItem(LAST_STUDENT_ID_KEY) || '')
const today = getTodayDateInput()
const bookingDate = ref(today)
const startTime = ref(startTimes[0])
const duration = ref(bookingDurations[0].value)
const search = ref('')
const selectedLocation = ref('all')
const selectedLevel = ref('all')
const selectedStatus = ref('all')
const liveUpdatedAt = ref(new Date())
const selectedMachineId = ref('')
const toastMessage = ref('')
const activityLog = ref([])
let clockTimer
let toastTimer
let activityId = 0

const quickStatusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Unavailable', value: 'unavailable' },
  { label: 'Service issue', value: 'service' }
]

const machines = computed(() => hydrateMachines(reservations.value))
const liveUpdatedLabel = computed(() => formatTime(liveUpdatedAt.value))
const reservation = computed(() => getStudentReservation(reservations.value, studentId.value))
const selectedMachine = computed(() => machines.value.find((machine) => machine.id === selectedMachineId.value) || null)
const canCancelSelected = computed(
  () => selectedMachine.value?.reservedBy && selectedMachine.value.reservedBy === normalizeStudentId(studentId.value)
)
const locationOptions = computed(() => uniqueSorted(machines.value.map((machine) => machine.location)))
const levelOptions = computed(() => uniqueSorted(machines.value.map((machine) => machine.level)))
const filteredMachines = computed(() =>
  filterMachines(machines.value, {
    level: selectedLevel.value,
    location: selectedLocation.value,
    search: search.value,
    status: selectedStatus.value
  })
)
const groupedMachines = computed(() => groupMachines(filteredMachines.value))
const stats = computed(() => summarizeMachines(machines.value))

watch(studentId, (value) => {
  window.localStorage.setItem(LAST_STUDENT_ID_KEY, normalizeStudentId(value))
})

onMounted(() => {
  updateHeaderClock()
  addActivity('Status board opened.')
  clockTimer = window.setInterval(() => {
    liveUpdatedAt.value = new Date()
    updateHeaderClock()
  }, 1000)
  window.addEventListener('storage', syncReservations)
})

onBeforeUnmount(() => {
  window.clearInterval(clockTimer)
  window.clearTimeout(toastTimer)
  window.removeEventListener('storage', syncReservations)
})

function reserveSelectedMachine() {
  if (!selectedMachine.value) {
    return
  }
  reserveMachine(selectedMachine.value)
}

function reserveMachine(machine) {
  if (!isAvailable(machine)) {
    return
  }

  const result = createReservation(reservations.value, machine.id, {
    date: bookingDate.value,
    duration: duration.value,
    startTime: startTime.value,
    studentId: studentId.value
  })

  if (!result.ok) {
    showToast(result.error)
    addActivity(`Reservation blocked for ${machine.id}.`)
    return
  }

  reservations.value = result.reservations
  writeReservations(reservations.value)
  selectedMachineId.value = machine.id
  liveUpdatedAt.value = new Date()
  addActivity(`${machine.id} reserved for ${result.reservation.studentId}.`)
  showToast(`${machine.id} reserved until ${result.reservation.endsAtLabel}.`)
}

function handleComputerClick(machine) {
  selectedMachineId.value = machine.id
  if (isAvailable(machine)) {
    reserveMachine(machine)
    return
  }
  showToast(`${machine.id} is ${machineStatusLabel(machine).toLowerCase()}: ${machine.reason}`)
  addActivity(`${machine.id} selected for review.`)
}

function selectMachine(machine) {
  selectedMachineId.value = machine.id
  addActivity(`${machine.id} selected from details list.`)
}

function clearReservation() {
  const result = cancelStudentReservation(reservations.value, studentId.value)
  if (!result.ok) {
    showToast(result.error)
    return
  }

  reservations.value = result.reservations
  writeReservations(reservations.value)
  selectedMachineId.value = result.reservation.machineId
  addActivity(`${result.reservation.machineId} reservation cancelled.`)
  showToast(`${result.reservation.machineId} reservation was cancelled.`)
  liveUpdatedAt.value = new Date()
}

function refreshStatus() {
  reservations.value = readReservations()
  liveUpdatedAt.value = new Date()
  addActivity('Status refreshed.')
  showToast('Computer status has been refreshed.')
}

function setStatusFilter(status) {
  selectedStatus.value = status
  addActivity(`Status filter changed to ${quickStatusFilters.find((filter) => filter.value === status)?.label || status}.`)
}

function clearFilters() {
  search.value = ''
  selectedLocation.value = 'all'
  selectedLevel.value = 'all'
  selectedStatus.value = 'all'
  addActivity('Filters cleared.')
}

async function findNextAvailable() {
  let machine = filteredMachines.value.find(isAvailable)
  if (!machine) {
    search.value = ''
    selectedLocation.value = 'all'
    selectedLevel.value = 'all'
    selectedStatus.value = 'available'
    await nextTick()
    machine = filteredMachines.value.find(isAvailable)
  }

  if (!machine) {
    showToast('No available computers found.')
    addActivity('No available computers found.')
    return
  }

  selectedMachineId.value = machine.id
  showToast(`${machine.id} is available.`)
  addActivity(`${machine.id} highlighted as the next available computer.`)
  await nextTick()
  document.querySelector(`[data-machine-id="${machine.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function clearActivity() {
  activityLog.value = []
  showToast('Activity log cleared.')
}

function showToast(message) {
  window.clearTimeout(toastTimer)
  toastMessage.value = message
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 3200)
}

function addActivity(text) {
  activityLog.value = [
    { id: activityId++, text, time: formatTime(new Date()) },
    ...activityLog.value
  ].slice(0, 6)
}

function syncReservations() {
  reservations.value = readReservations()
  liveUpdatedAt.value = new Date()
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
</script>
