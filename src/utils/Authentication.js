const isString = (data) => (typeof data === 'string' || data instanceof String);

const Authentication = {
    options:{ 
        hostname: 'http://localhost',
        port: 8890,
        path: 'realms/master/protocol/openid-connect/token',
		defaultHeader: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		defaultQueries: {
			client_id: "users-auth",
			grant_type: "password",
			client_secret: "yvBVDiIgETGLYlgYTBC14oy1hq6hgjMV",
			scope: "openid"
		}
    },
	accessSystem: (
		username, 
		passWord, 
		callback, 
		errorCallback
	) => {
		if(!username || !passWord || !callback || !errorCallback)
			errorCallback(500, "Error: Missing params.");
		else if(!isString(username) || !isString(passWord))
			errorCallback(500, "Error: Invalid parameters type.");
		else{
			const superagent = require("superagent");
			
			console.log("Tentando conectar");
			
			superagent
				.post(`${Authentication.options.hostname}:${Authentication.options.port}/${Authentication.options.path}`)
				.set(Authentication.options.defaultHeader)
				.type("form")
				.send({
					client_id: "users-auth",
					grant_type: "password",
					client_secret: "yvBVDiIgETGLYlgYTBC14oy1hq6hgjMV",
					scope: "openid",
					username: username,
					password: passWord
				})
				.then(res => callback(res.body))
				.catch(error => errorCallback(error.status, error.message, error));
				
			
		}	
		
	},
	
}

// const callback = (body) => {
	// console.log("Used loged successfuly\n");
	// console.log(body);
// }

// const errorCallback = (status, message, fullError) => {
	// console.log("Error when trying to login the user.\n");
	// console.log(`${status}: ${message}`);
	// console.log(fullError)
// }


// Authentication.accessSystem('admin', 'admin', callback, errorCallback)

export default Authentication;

