const ControllerContracts = {
    options:{ 
        hostname: 'http://localhost',
        port: 8080,
        path: 'api/v1/contracts',
    },
	isDataFormatValid: (dataObject) => {
		if(typeof(dataObject) === 'object'){
			const keysPattern = ["id","expiration", "cnpj", "insurancePolicyId", "customerId"];
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
			return "Error: Missing params at function ControllerContracts.create(data, callback, errorCallback)";
		else if(!ControllerContracts.isDataFormatValid(data))
			return "Error: The data object doesn't fit the pattern. See ControllerContracts.create(data, callback, errorCallback)"
		
        const superagent = require("superagent");
		
		superagent
			.post(`${ControllerContracts.options.hostname}:${ControllerContracts.options.port}/${ControllerContracts.options.path}`)
			.send(data)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
    },
	
	//#GET
	getAll: (sortBy, order, callback, errorCallback) => {
		if(!sortBy || !order || !callback || !errorCallback)
			return "Error: Missing params at function ControllerContracts.getAll(sortBy, order, callback, errorCallback)";
		else if(typeof(sortBy) !== 'string' || typeof(order) !== 'string' )
			return "Error: 'sortBy' and 'order' must to be string. See ControllerContracts.getAll(sortBy, order, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerContracts.options.hostname}:${ControllerContracts.options.port}/${ControllerContracts.options.path}?sortBy=${sortBy}&order=${order}`)
			.then(res => {
				const dataGotten = res.body.map(registry => {
					const simplifiedRegistry = {
						...registry,
						expiration: new Date (registry.expiration).toLocaleDateString()
					}
					
					return simplifiedRegistry;
				})
				callback(dataGotten);
			})
			.catch(error => errorCallback(error.status, error.message));
	},
	
	getOne: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerContracts.getOne(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerContracts.getOne(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.get(`${ControllerContracts.options.hostname}:${ControllerContracts.options.port}/${ControllerContracts.options.path}/${id}`)
			.then(res => callback(res.body))
			.catch(error => errorCallback(error.status, error.message));
			
	
	},
	
	//#UPDATE
	update: (newData, callback, errorCallback) => {
		if(!newData || !callback || !errorCallback)
			return "Error: Missing params at function ControllerContracts.update(newData, callback, errorCallback)";
		else if(!ControllerContracts.isDataFormatValid(newData))
			return "Error: The data object doesn't fit the pattern. See ControllerContracts.update(newData, callback, errorCallback)"
		
		ControllerContracts.getOne(newData.id, (body) => {
			const superagent = require("superagent");
			
			const updatedData = Object.assign({}, body, newData);
			
			superagent
				.put(`${ControllerContracts.options.hostname}:${ControllerContracts.options.port}/${ControllerContracts.options.path}/${updatedData.id}`)
				.send(updatedData)
				.then(res => callback(res.body))
				.catch(error => errorCallback(error.status, error.message));
		}, errorCallback);
	},
	
	//#DELETE
	remove: (id, callback, errorCallback) => {
		if(!id || !callback || !errorCallback)
			return "Error: Missing params at function ControllerContracts.remove(id, callback, errorCallback)";
		else if(!Number.isInteger(id))
			return "Error: Id must to be a Integer. See ControllerContracts.remove(id, callback, errorCallback)";
		
		const superagent = require("superagent");

		superagent
			.del(`${ControllerContracts.options.hostname}:${ControllerContracts.options.port}/${ControllerContracts.options.path}/${id}`)
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
		expiration: new Date(),
		cnpj: "15.091.228/0006-32",
		insurancePolicyId: 9,
		customerId: 2
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
		id: 1,
		expiration: new Date(),
		cnpj: "15.091.008/0006-32",
		insurancePolicyId: 43,
		customerId: 1
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
	// ControllerContracts.create(createTest.data, createTest.callback, createTest.errorCallback)
// );

// console.log(
	// ControllerContracts.getAll('customerId', 'asc', getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerContracts.getOne(2, getTest.callback, getTest.errorCallback)
// );

// console.log(
	// ControllerContracts.update(updateTest.data, updateTest.callback, updateTest.errorCallback)
// );

// console.log(
	// ControllerContracts.remove(1, removeTest.callback, removeTest.errorCallback)
// );

export default ControllerContracts;
