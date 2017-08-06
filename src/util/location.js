export function getLocation(cb, err) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb, err)
  }
  else {
    err("Geolocation is not supported")
  }
}
