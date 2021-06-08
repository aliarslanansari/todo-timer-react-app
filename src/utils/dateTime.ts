export const secondsToHHmmss = (seconds: number = 0) => {
  if (seconds <= 0) {
    return "00:00"
  }
  const ss = (seconds % 60).toString().padStart(2, "0")
  const HH = Math.floor(seconds / 60 / 60)
  const mm = (Math.floor(seconds / 60) - HH * 60).toString().padStart(2, "0")
  if (HH <= 0) {
    return `${mm}:${ss}`
  }
  return `${String(HH).padStart(2, "0")}:${mm}:${ss}`
}
export const secondsToMinutes = (seconds: number = 0) => {
  return Math.floor(seconds / 60) - Math.floor(seconds / 60 / 60) * 60
}
