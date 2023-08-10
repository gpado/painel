const ControllerEmployees = {
    options:{ 
        hostname: 'http://localhost',
        port: 8080,
        path: 'api/v1/employees',
    },
	isDataFormatValid: (dataObject) => {
		if(typeof(dataObject) === 'object'){
			const keysPattern = ["emailId", "firstName", "id", "lastName"];
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
    create: (data, callback, errorCallback) => {
		if(!data || !callback || !errorCallback)
			return "Error: Missing params at function ControllerEmployees.create(data, callback, errorCallback)";
		else if(!ControllerEmployees.isDataFormatValid(data))
			return "Error: The data object doesn't fit the pattern. See ControllerEmployees.create(data, callback, errorCallback)"
		
        const superagent = require("superagent");
		
		superagent
			.post(`${ControllerEmployees.options.hostname}:${ControllerEmployees.options.port}/${ControllerEmployees.options.path}`)
			.send(data)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
    },
	
	//#GET
	getAll: (sortBy, order, callback, errorCallback) => {
		if(!sortBy || !order || !callback || !errorCallback)
			return "Error: Missing params at function ControllerEmployees.getAll(sortBy, order, callback, errorCallback)";
		else if(typeof(sortBy) !== 'string' || typeof(order) !== 'string' )
			return "Error: 'sortBy' and 'order' must to be string. See ControllerEmployees.getAll(sortBy, order, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerEmployees.options.hostname}:${ControllerEmployees.options.port}/${ControllerEmployees.options.path}?sortBy=${sortBy}&order=${order}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
	},
	
	getOne: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerEmployees.getOne(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerEmployees.getOne(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerEmployees.options.hostname}:${ControllerEmployees.options.port}/${ControllerEmployees.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
			
	
	},
	
	//#UPDATE
	update: (newData, callback, errorCallback) => {
		if(!newData || !callback || !errorCallback)
			return "Error: Missing params at function ControllerEmployees.update(newData, callback, errorCallback)";
		else if(!ControllerEmployees.isDataFormatValid(newData))
			return "Error: The data object doesn't fit the pattern. See ControllerEmployees.update(newData, callback, errorCallback)"
		
		ControllerEmployees.getOne(newData.id, (body) => {
			const superagent = require("superagent");
			
			const updatedData = Object.assign({}, body, newData);
			
			superagent
				.put(`${ControllerEmployees.options.hostname}:${ControllerEmployees.options.port}/${ControllerEmployees.options.path}/${updatedData.id}`)
				.send(updatedData)
				.then(res => callback(res.body))
				.catch(error => errorCallback(error.status, error.message));
		}, errorCallback);
	},
	
	//#DELETE
	remove: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerEmployees.remove(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerEmployees.remove(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.del(`${ControllerEmployees.options.hostname}:${ControllerEmployees.options.port}/${ControllerEmployees.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
	},
	
}

const createTest = {
	callback: (body) => {
		console.log(`Funcionário ${body.firstName} foi cadastrado com id ${body.id}`);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
	data: {
		firstName:"Lívia",
		lastName:"Silva",
		emailId:"Livia@gmail.com",
	}
}

const getTest = {
	callback: (body) => {
		console.log("Informações sobre funcionário(s)");
		console.log(body);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
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
		emailId:"m.fly@outlook.com",
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

// console.log(
	// ControllerEmployees.create(createTest.data, createTest.callback, createTest.errorCallback)
// );

// console.log(
	// ControllerEmployees.getAll('firstName', 'desc', getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerEmployees.getOne(3, getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerEmployees.update(updateTest.data, updateTest.callback, updateTest.errorCallback)
// );

// console.log(
	// ControllerEmployees.remove(2, removeTest.callback, removeTest.errorCallback)
// );

export default ControllerEmployees;
