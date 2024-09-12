import { derived, readable, writable } from 'svelte/store';
import { csv } from 'd3';
import { filter } from 'lodash';

export const medalsCountrySport = readable([], async (set) => {
  const loadedData = await csv("src/data/country_sport_medals.csv");
  set(loadedData); 
});

export const data = readable([], async (set) => {
  const loadedData = await csv("src/data/paris_2024_olympics_medal_tally.csv");
  set(loadedData); 
});

export const sortCountriesBy = writable("Total");

export const selectedSport = writable("All");

export const selectedGender = writable("All");

export const selectedCountry = writable("All");

export const filteredData = derived([data, selectedSport, selectedGender, selectedCountry], ([$data, $selectedSport, $selectedGender, $selectedCountry]) => { 
  return $data.filter(d => $selectedSport === "All" ? true : d.sport === $selectedSport)
    .filter(d => $selectedGender === "All" ? true : d.gender === $selectedGender)
    .filter(d => $selectedCountry === "All" ? true : d.country === $selectedCountry);
  
})

export const countryData = derived([filteredData, sortCountriesBy], ([$filteredData, $sortCountriesBy]) => {
  const cData = Array.from(new Set($filteredData.map(d => d.country))).map(country => 
    ({
      country,
      total_medals: $filteredData.filter(d => d.country === country).length,
      gold_medals: $filteredData.filter(d => d.country === country && d.medal_type === "Gold").length,
      silver_medals: $filteredData.filter(d => d.country === country && d.medal_type === "Silver").length,
      bronze_medals: $filteredData.filter(d => d.country === country && d.medal_type === "Bronze").length,
    })
  ).sort((a, b) => {
    if ($sortCountriesBy === "Total") return b.total_medals - a.total_medals
    else if ($sortCountriesBy === "Gold") return b.gold_medals - a.gold_medals
    else if ($sortCountriesBy === "Silver") return b.silver_medals - a.silver_medals
    else if ($sortCountriesBy === "Bronze") return b.bronze_medals - a.bronze_medals
    else if ($sortCountriesBy === "Alphabetical") {
      const countryA = a.country.toUpperCase();
      const countryB = b.country.toUpperCase();
      if (countryA < countryB) return -1
      else if (countryA > countryB) return 1
      else return 0
    }
  });

  // console.log(cData[0])
  return cData;
});

export const sportsData = derived([filteredData, selectedCountry], ([$filteredData, $selectedCountry]) => {
  const sData = Array.from(new Set($filteredData.map(d => d.sport))).map(sport => 
    ({
      sport,
      total_medals: $filteredData.filter(d => d.sport === sport).length,
      gold_medals: $filteredData.filter(d => d.sport === sport && d.medal_type === "Gold").length,
      silver_medals: $filteredData.filter(d => d.sport === sport && d.medal_type === "Silver").length,
      bronze_medals: $filteredData.filter(d => d.sport === sport && d.medal_type === "Bronze").length,
    })
  ).sort((a, b) => b.total_medals - a.total_medals);

  return sData;
});


export const medalsByDate = derived([data, filteredData], ([$data, $filteredData]) => {
  const mData = Array.from(new Set($data.map(d => d.date_of_medal))).map(day => {
    // console.log(day.toString().split("/"))
    let date = day.toString().split("/");    
    let obj = {};
    obj.date = new Date(`${date[2]}-${date[0]}-${date[1]}`);
    obj.medals = $filteredData.filter(d => d.date_of_medal === day).length;
    return obj;
  })
  let cSum = 0;
  mData.map(d => {
    cSum = cSum + d.medals;
    d.cumulative_medals = cSum;
  })
  return mData;
})

export const pieData = derived([filteredData], ([$filteredData]) => {
  const gData = Array.from(new Set($filteredData.map(d => d.gender))).map(gender => ({
    gender,
    medals: $filteredData.filter(d => d.gender === gender).length
  })).sort((a, b) => b.medals - a.medals)
  return gData;  
})

// export const d = derived(countryData, ($countryData) => {
//   console.log($countryData[0])
//   return $countryData;
// });