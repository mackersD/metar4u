export function getLocation(onSuccess) {
  console.log("here")
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess)
  }
}
