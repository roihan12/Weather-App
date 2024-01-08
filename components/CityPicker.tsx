"use client";

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };
  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
       router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeAsiaAustraliaIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country </label>
        </div>

        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeAsiaAustraliaIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City </label>
          </div>

          <Select
            className="text-black"
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
