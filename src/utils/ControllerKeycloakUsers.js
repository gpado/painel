const ControllerKeycloakUsers = {
    options:{ 
        hostname: 'http://localhost',
        port: 8890,
        path: 'admin/realms/master/users',
    },
	isDataFormatValid: (dataObject) => {
		if(typeof(dataObject) === 'object'){
			const keysPattern = ["email", "firstName", "id", "lastName"];
			const dataKeys = Object.keys(dataObject);
			let theKeysMacth = true;
			
			dataKeys.forEach((key) => {
				theKeysMacth &= keysPattern.includes(key);
			});
			
			return theKeysMacth;
		}
		return false;
	},
	
	//#CREATE
    create: (accessToken, data, callback, errorCallback) => {
		if(!accessToken || !data || !callback || !errorCallback)
			errorCallback(500, "Error: Missing params at function ControllerKeycloakUsers.create(data, callback, errorCallback)");
		else if(!ControllerKeycloakUsers.isDataFormatValid(data))
			errorCallback(500, "Error: The data object doesn't fit the pattern. See ControllerKeycloakUsers.create(data, callback, errorCallback)");
		
        const superagent = require("superagent");
		
		superagent
			.post(`${ControllerKeycloakUsers.options.hostname}:${ControllerKeycloakUsers.options.port}/${ControllerKeycloakUsers.options.path}`)
			.send(data)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message, error));
    },
	
	
	//#UPDATE
	update: (accessToken, newData, callback, errorCallback) => {
		if(!accessToken || !newData || !callback || !errorCallback)
			return "Error: Missing params at function ControllerKeycloakUsers.update(newData, callback, errorCallback)";
		else if(!ControllerKeycloakUsers.isDataFormatValid(newData))
			return "Error: The data object doesn't fit the pattern. See ControllerKeycloakUsers.update(newData, callback, errorCallback)"
		
		ControllerKeycloakUsers.getOne(newData.id, (body) => {
			const superagent = require("superagent");
			
			const updatedData = Object.assign({}, body, newData);
			
			superagent
				.put(`${ControllerKeycloakUsers.options.hostname}:${ControllerKeycloakUsers.options.port}/${ControllerKeycloakUsers.options.path}/${updatedData.id}`)
				.send(updatedData)
				.then(res => callback(res.body))
				.catch(error => errorCallback(error.status, error.message, error));
		}, errorCallback);
	},
	
	//#DELETE
	remove: (accessToken, id, callback, errorCallback) => {
		if(!accessToken || !id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerKeycloakUsers.remove(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerKeycloakUsers.remove(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.del(`${ControllerKeycloakUsers.options.hostname}:${ControllerKeycloakUsers.options.port}/${ControllerKeycloakUsers.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message, error));
	},
	
}

const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKdzhvejQtbFI2dFVQTzBSNFZiZUtyU3R2VTlNU2pJdDhhTjV6ZVV2aTY0In0.eyJleHAiOjE2OTM4NjE1MTIsImlhdCI6MTY5Mzg2MDYxMiwianRpIjoiZDE3MzhkY2EtZjRhYy00NDlkLWExMTktZTQxZWMzNjU0ZWUzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4ODkwL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiI5YTBlZDMzMi00NzQwLTRmYTMtODU2NS1jNzRjYmRjMzI2MGYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiOGQ2NDljMjAtY2JhMi00OTJjLThkMDEtZmVlOTdkODhhY2M5IiwiYWNyIjoiMSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI4ZDY0OWMyMC1jYmEyLTQ5MmMtOGQwMS1mZWU5N2Q4OGFjYzkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.A1Dr97fR9xvCVPuxpRLJ7at-4oGJeoDsqp0WM71i3F8cwuTMFEu7z8XTwh603n3EkehU3nqSi9pLfQYmNgkLsbZgE35cSpNy9U05nU-oJpBsRLzvIUVVFaJlzflyB_oPCMAsBPhsVM2LdRAH2CskO5EoZBbStCySkUn_MWyKf5cTfTpCZvrumriGYGpgb2fKoOhVuyO0Ni0AZhh6nx3UwX3kNvHxtaqKNKqmzIi9hjepMKlLLEdY1EJ4JqaCDz0k0hmfIML0zaDwQNzAvLPtOW47bBX_xSvK19Tl3r9DogQpfdVW_EcC934lBUw6oDzDCL5foHkDtFmifxfdpjfLXw";

const createTest = {
	callback: (body) => {
		console.log(`Funcionário ${body.firstName} foi cadastrado com id ${body.id}`);
	},
	errorCallback: (status, message, fullError) => {
		console.log(`Error ${status} - ${message}`);
		console.log(fullError);
	},
	data: {
		id: 1,
		firstName:"Lívia",
		lastName:"Silva",
		email:"Livia@gmail.com",
	}
}

const updateTest = {
	callback: (body) => {
		console.log(`Os dados do funcionário (id = ${body.id}) foram alterados`);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
	data: {
		id: 2,
		firstName:"Martin",
		lastName:"Fly",
		email:"m.fly@outlook.com",
	}
}

const removeTest = {
	callback: (body) => {
		console.log(body);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
}

console.log(
	ControllerKeycloakUsers.create(accessToken, createTest.data, createTest.callback, createTest.errorCallback)
);

// console.log(
	// ControllerKeycloakUsers.update(accessToken, updateTest.data, updateTest.callback, updateTest.errorCallback)
// );

// console.log(
	// ControllerKeycloakUsers.remove(accessToken, 2, removeTest.callback, removeTest.errorCallback)
// );

// export default ControllerKeycloakUsers;
