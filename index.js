const server=require("./database/resolver.js");
server.listen().then(({ url }) => {
	console.log(`listning at ${url}`);
});
