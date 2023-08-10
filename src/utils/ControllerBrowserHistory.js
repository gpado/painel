const ControllerBrowserHistory = {
	
	addQueryParam: (paramName, paramValue) => {
		const currentURL = new URL(window.location);
		
		currentURL.searchParams.append(paramName, paramValue);
		window.history.pushState({}, '', currentURL);
	},
	
	removeQueryParam: (paramName) => {
		const currentURL = new URL(window.location);
		
		currentURL.searchParams.delete(paramName);
		window.history.pushState({}, '', currentURL);
	},
	
	getQueryParam: (paramName) => {
		const currentURL = new URL(window.location);
		
		return currentURL.searchParams.get(paramName);
	}
}

export default ControllerBrowserHistory;
