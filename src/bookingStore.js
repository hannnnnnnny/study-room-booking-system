const RESERVATIONS_KEY = 'study-room-booking.reservations.v2'

export function readReservations(storage = window.localStorage) {
  try {
    const value = storage.getItem(RESERVATIONS_KEY)
    if (!value) {
      return []
    }
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((item) => item?.status === 'active') : []
  } catch {
    return []
  }
}

export function writeReservations(reservations, storage = window.localStorage) {
  storage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations))
}

export function clearReservations(storage = window.localStorage) {
  storage.removeItem(RESERVATIONS_KEY)
}
