export const handleSearch = async ({}) => {
  try {
    setLoading(true);
    const url = new URL(apiUrl);
    url.searchParams.append("q", city);
    url.searchParams.append("appid", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (response.ok) {
      setWeatherData(data);
      setError(null);
    } else {
      throw new Error(data.message || "Error fetching weather data");
    }
  } catch (error) {
    setWeatherData(null);
    setError(error.message || "Error fetching weather data");
  } finally {
    setLoading(false);
  }
};
