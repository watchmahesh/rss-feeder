import axios from 'axios';
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config();

function generateParams(params: Record<string, string>): string {
    return Object.keys(params).map((param) => `${param}=${params[param]}`).join('&');
  }

  const search = async (data: Record<string, string>) => {
    const ApiKey = process.env.GUARDIAN_API_KEY;
    const params = generateParams(data);

    try {
      // Make HTTPS request to The Guardian's API using Axios and await
      const apiUrl = `https://content.guardianapis.com/search?${params}&api-key=${ApiKey}&show-fields=all`;
      const response = await axios.get(apiUrl);

      // Parse the JSON response data
      const resData = response.data;
      return resData;
    } catch (error) {
      throw error;
    }
  };

  export default {
    search,
  };
