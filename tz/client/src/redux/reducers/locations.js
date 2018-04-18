const locationsInit = [
	{
		locStr: "Oakland, CA",
		lat: -120,
		lon: 45,
		tz: "Pacific",
		tzOffset: 7
	},
	{
		locStr: "Barcelona, Esp",
		lat: 20,
		lon: 38,
		tz: "Europe2",
		tzOffset: -1
	},

]



const locationsReducer = (state = locationsInit, action) => {

	return state;
};

export default locationsReducer;
