const ControllerCustomers = {
    options:{ 
        hostname: 'http://localhost',
        port: 8080,
        path: 'api/v1/customers',
    },
	isDataFormatValid: (dataObject) => {
		if(typeof(dataObject) === 'object'){
			const keysPattern = ["id","cnpj", "state", "contractId"];
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
			return "Error: Missing params at function ControllerCustomers.create(data, callback, errorCallback)";
		else if(!ControllerCustomers.isDataFormatValid(data))
			return "Error: The data object doesn't fit the pattern. See ControllerCustomers.create(data, callback, errorCallback)"
		
        const superagent = require("superagent");
		
		superagent
			.post(`${ControllerCustomers.options.hostname}:${ControllerCustomers.options.port}/${ControllerCustomers.options.path}`)
			.send(data)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
    },
	
	//#GET
	getAll: (sortBy, order, callback, errorCallback) => {
		if(!sortBy || !order || !callback || !errorCallback)
			return "Error: Missing params at function ControllerCustomers.getAll(sortBy, order, callback, errorCallback)";
		else if(typeof(sortBy) !== 'string' || typeof(order) !== 'string' )
			return "Error: 'sortBy' and 'order' must to be string. See ControllerCustomers.getAll(sortBy, order, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerCustomers.options.hostname}:${ControllerCustomers.options.port}/${ControllerCustomers.options.path}?sortBy=${sortBy}&order=${order}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
	},
	
	getOne: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerCustomers.getOne(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerCustomers.getOne(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerCustomers.options.hostname}:${ControllerCustomers.options.port}/${ControllerCustomers.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
			
	
	},
	
	//#UPDATE
	update: (newData, callback, errorCallback) => {
		if(!newData || !callback || !errorCallback)
			return "Error: Missing params at function ControllerCustomers.update(newData, callback, errorCallback)";
		else if(!ControllerCustomers.isDataFormatValid(newData))
			return "Error: The data object doesn't fit the pattern. See ControllerCustomers.update(newData, callback, errorCallback)"
		
		ControllerCustomers.getOne(newData.id, (body) => {
			const superagent = require("superagent");
			
			const updatedData = Object.assign({}, body, newData);
			
			superagent
				.put(`${ControllerCustomers.options.hostname}:${ControllerCustomers.options.port}/${ControllerCustomers.options.path}/${updatedData.id}`)
				.send(updatedData)
				.then(res => callback(res.body))
				.catch(error => errorCallback(error.status, error.message));
		}, errorCallback);
	},
	
	//#DELETE
	remove: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerCustomers.remove(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerCustomers.remove(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.del(`${ControllerCustomers.options.hostname}:${ControllerCustomers.options.port}/${ControllerCustomers.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
	},
	
}

const createTest = {
	callback: (body) => {
		console.log(`Cliente ${body.cnpj} foi cadastrado`);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
	data: {
		cnpj: "04.117.820/0001-19",
		state: "RJ",
		contractId: 201
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
		console.log(`Os dados do cliente (cnpj = ${body.cnpj}) foram alterados`);
	},
	errorCallback: (status, message) => {
		console.log(`Error ${status} - ${message}`);
	},
	data: {
		id: 3,
		cnpj: 2345,
		state: "SP",
		contractId: 112
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
	// ControllerCustomers.create(createTest.data, createTest.callback, createTest.errorCallback)
// );

// console.log(
	// ControllerCustomers.getAll('firstName', 'desc', getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerCustomers.getOne(3, getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerCustomers.update(updateTest.data, updateTest.callback, updateTest.errorCallback)
// );

// console.log(
	// ControllerCustomers.remove(1, removeTest.callback, removeTest.errorCallback)
// );

export default ControllerCustomers;
