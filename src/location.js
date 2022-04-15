import Cities from './worldcities.csv';

const locationHelper = (() => {
	let cities = [];

	function capitalize(str) {
		return str.replace(/^\w/, (c) => c.toUpperCase());
	}
	// function display(){
	//     // console.log(cities[0]);
	//     // console.log("Something");
	// }

	function query(input) {
		// console.log(input);
		if (typeof input === 'string') {
			let cityQuery = cities.filter((city, index) => {
				if (city.hasOwnProperty('city_ascii')) {
					return city['city_ascii'].indexOf(input.toLowerCase()) > -1;
				}
				return false;
			});

			if (cityQuery) {
				if (cityQuery.length > 5) {
					return cityQuery
						.slice(0, 4)
						.map((city) => `${capitalize(city['city_ascii'])}, ${capitalize(city['country'])}`);
				}
				return cityQuery.map((city) => `${capitalize(city['city_ascii'])}, ${capitalize(city['country'])}`);
			}
		}
	}
	function processCityData() {
		let columns = null;
		Cities.forEach((element, index) => {
			if (index === 0) {
				columns = element;
				// console.log(columns);
			} else {
				let object = {};
				columns.forEach((column, index) => {
					// console.log(column);

					if (column === 'city_ascii' || column === 'country') {
						if (element[index]) {
							object[column] = element[index].toString().toLowerCase();
						}
					}
				});
				// console.log(object);

				cities.push(object);
			}
		});
	}
	function initialize() {
		processCityData();
	}
	return { initialize, query ,capitalize};
})();

export { locationHelper };
