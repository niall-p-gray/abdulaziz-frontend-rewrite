export const ddmmyyDateValidator = (value) => {
  return /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(value)
}
