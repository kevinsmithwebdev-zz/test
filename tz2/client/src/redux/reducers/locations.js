const locationsInit = [
	{
		locStr: "Oakland, CA, USA",
		lat: 37.8043637,
		lon: -122.2711137,
		dstOffset: 1,
		rawOffset: -8,
		timeZoneId: 'America/Los_Angeles',
		timeZoneName: "Pacific Daylight Time"
	},
	{
		locStr: "Barcelona, Spain",
		lat: 41.3850639,
		lon: 2.1734035,
		dstOffset: 1,
		rawOffset: 1,
		timeZoneId: 'Europe/Madrid',
		timeZoneName: "Central European Summer Time"
	}
]


const locationsReducer = (state = locationsInit, action) => {

	switch (action.type) {
		case 'SET_LOCATION':
			let newLocs = [...state]
			newLocs[action.payload.locSlot] = action.payload.locObj
			return newLocs
		default:
			return state
	}
}

export default locationsReducer
