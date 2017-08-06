import stationList from './stationList'

export function getNearestStations(lat, long) {
  var stationDist = stationList.map((station) => {
    return {
      "icao": station.icao,
      "name": station.name,
      "lat": station.lat,
      "long": station.long,
      "distance": distanceBetweenCoordinates(station.lat, station.long, lat, long),
      "bearing": initialBearingBetweenCoordinates(lat, long, station.lat, station.long)
    }
  }).sort((a, b) => {
    return a.distance - b.distance
  })
  return stationDist
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180
}

function radiansToDegrees(radians) {
  return (180 * radians) / Math.PI
}

function initialBearingBetweenCoordinates(lat1, long1, lat2, long2) {
  var dLong = degreesToRadians(long2 - long1)
  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  var y = Math.sin(dLong) * Math.cos(lat2)
  var x = Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLong)
  return radiansToDegrees(Math.atan2(y, x))
}

function distanceBetweenCoordinates(lat1, long1, lat2, long2) {
  const earthRadius = 3959 //sm
  var dLat = degreesToRadians(lat2-lat1)
  var dLong = degreesToRadians(long2-long1)

  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLong / 2) * Math.sin(dLong /2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return c * earthRadius
}
