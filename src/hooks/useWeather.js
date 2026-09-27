import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/weatherUtils';

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    } catch {
      return [];
    }
  });
  const [unit, setUnit] = useState(() => localStorage.getItem('weatherUnit') || 'C');

  // Sync search history to localStorage
  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Sync unit preference to localStorage
  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  const fetchWeatherByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&cnt=40`),
      ]);

      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);

      // Add to search history (dedup, max 8)
      setSearchHistory((prev) => {
        const cityName = currentRes.data.name + ', ' + currentRes.data.sys.country;
        const filtered = prev.filter((h) => h.toLowerCase() !== cityName.toLowerCase());
        return [cityName, ...filtered].slice(0, 8);
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your configuration.');
      } else if (err.code === 'ECONNABORTED' || !navigator.onLine) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=40`),
      ]);

      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);

      const cityName = currentRes.data.name + ', ' + currentRes.data.sys.country;
      setSearchHistory((prev) => {
        const filtered = prev.filter((h) => h.toLowerCase() !== cityName.toLowerCase());
        return [cityName, ...filtered].slice(0, 8);
      });
    } catch (err) {
      setError('Could not fetch weather for your location.');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  }, []);

  const removeFromHistory = useCallback((item) => {
    setSearchHistory((prev) => prev.filter((h) => h !== item));
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    searchHistory,
    unit,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearHistory,
    toggleUnit,
    removeFromHistory,
  };
};

export default useWeather;
