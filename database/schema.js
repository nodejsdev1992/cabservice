const typeDefs = `
	type Booking {
		user: String
		source: GeoLocation
		destination: GeoLocation
	}
	type GeoLocation {
		type: String
		coordinates: [Float]
	}
	type Cab {
		driver: String
		location: GeoLocation
	}
	type Query{
		getPastBookings(username:String! ,password:String!): [Booking]
		login(username: String, password: String): Boolean
		getNearbyCabs(lat:Float!,long:Float!): [Cab]
	}
	type Mutation{
		createBooking(username:String!,password:String!,toLat:Float!,toLong:Float!, fromLat:Float!, fromLong:Float!): Boolean
	}`;

module.exports = typeDefs;
