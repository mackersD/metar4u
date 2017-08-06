export function normalizeMetarData(data) {
  return {
    altimeter: data.Altimeter,
    clouds: normalizeCloudList(data["Cloud-List"]),
    dewpoint: data.Dewpoint,
    flightRules: data["Flight-Rules"],
    rawReport: data["Raw-Report"],
    remarks: data.Remarks,
    temperature: data.Temperature,
    time: getMetarDate(data.Time),
    visibility: data.Visibility,
    windDirection: data["Wind-Direction"],
    windGust: data["Wind-Gust"],
    windSpeed: data["WindSpeed"],
    windVariableDirection: data["Wind-Variable-Dir"]
  }
}

const getMetarDate = (input) => {
  var now = new Date()
  var year = now.getUTCFullYear()
  var month = now.getUTCMonth()
  var day = input.substring(0, 2)
  var hour = input.substring(2, 4)
  var minute = input.substring(4, 6)
  return new Date(Date.UTC(year, month, day, hour, minute))
}

const normalizeCloudList = (cloudArray) => {
  return cloudArray.map(rec => {
    return {
      coverage: rec[0],
      altitude: rec[1]
    }
  })
}
