import App from './App'

// Method to retrieve all service providers by fetching data from the server
class ServiceProvidersAPI {
  async getAllServiceProviders() {
    try {
      const response = await fetch(`${App.apiBase}/service-providers`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })

      // response success checker
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      //if the response is ok/successful parse the response
      const serviceProviders = await response.json();
      return serviceProviders
    } catch (error) {       // catch and throw any errors if they come about during this process
      throw error
    }
  }

  //  method for retrieving the services based on the service provider ID
  async getServiceProvider(providerId) {
    try {
      // fetch data for the service
      const response = await fetch(`${App.apiBase}/service-providers/${providerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })

      // response success checker
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message)
      }

      //if the response is ok/successful parse the response
      const serviceProvider = await response.json();
      return serviceProvider
    } catch (error) {       // catch and throw any errors if they come about during this process
      throw error
    }
  }
}

export default new ServiceProvidersAPI();
