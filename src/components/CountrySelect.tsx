import React, { useState, useEffect } from 'react';
import { CountrySelectProps, Country } from '../types/types';
import { Select } from './ComponentStyles';

const CountrySelect: React.FC<CountrySelectProps> = ({ onCountryChange }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryValue, setSelectedCountryValue] = useState<string>('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=false");
        const data = await response.json();
        setCountries(data.countries);
  
        const defaultCountry = data.countries.find((country: Country) => country.value === data.userSelectValue);
        if (defaultCountry) {
          setSelectedCountryValue(defaultCountry.value);
          onCountryChange(defaultCountry.label); // Envía solo el nombre del país al padre
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchCountries();
  }, [onCountryChange]);
  

  // Manejo del cambio de selección de país
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCountryValue(selectedValue);

    const country = countries.find((c) => c.value === selectedValue);
    if (country) {
      onCountryChange(country.label); // Envía el nombre del país seleccionado al padre
    }
  };

  return (
    <Select value={selectedCountryValue} onChange={handleCountryChange}>
      <option value="">Selecciona tu país</option>
      {countries.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </Select>
  );
};

export default CountrySelect;
