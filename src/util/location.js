export function getLocation(onSuccess) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess)
  }
}
