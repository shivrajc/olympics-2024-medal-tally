<script>
  import Dropdown from "./Dropdown.svelte";    
  import { sortCountriesBy, selectedCountry, countryData, selectedSport, selectedGender, filteredData, data } from "./stores";

  $: countryList = Array.from(new Set($filteredData.map(d => d.country))).sort((a, b) => {
    if (a.toUpperCase() < b.toUpperCase()) return -1
    else if (a.toUpperCase() > b.toUpperCase()) return 1
    else return 0
  })

  $: sportList = Array.from(new Set($filteredData.map(d => d.sport))).sort((a, b) => {
    if (a.toUpperCase() < b.toUpperCase()) return -1
    else if (a.toUpperCase() > b.toUpperCase()) return 1
    else return 0
  })

  $: genderList = Array.from(new Set($filteredData.map(d => d.gender))).sort((a, b) => {
    if (a.toUpperCase() < b.toUpperCase()) return -1
    else if (a.toUpperCase() > b.toUpperCase()) return 1
    else return 0
  })

</script>

<div class="container">
    <div class="dropdown-container">
      <span class="label">COUNTRY</span>
      {#if $selectedCountry === "All"}        
        <Dropdown value={selectedCountry} options={["All", ...countryList]} />
      {:else}
        <button on:click={() => selectedCountry.set("All")}>
          <span>{$selectedCountry}</span>
          <span class="close">x</span>
        </button>        
      {/if}
    </div>
    <div class="dropdown-container">
      <span class="label">SPORT</span>
      {#if $selectedSport === "All"}        
        <Dropdown value={selectedSport} options={["All", ...sportList]} />
      {:else}
        <button on:click={() => selectedSport.set("All")}>
          <span>{$selectedSport}</span>
          <span class="close">x</span>
        </button>        
      {/if}
    </div>
    <div class="dropdown-container">      
      <span class="label">GENDER</span>
      {#if $selectedGender === "All"}        
        <Dropdown value={selectedGender} options={["All", ...genderList]} />
      {:else}
        <button on:click={() => selectedGender.set("All")}>
          <span>{$selectedGender}</span>
          <span class="close">x</span>
        </button>        
      {/if}
    </div>
    <div class="dropdown-container">      
      {#if $selectedCountry === "All"}        
        <span class="label">SORT BY</span>
        <Dropdown value={sortCountriesBy} options={["Total", "Gold", "Silver", "Bronze", "Alphabetical"]} />     
      {/if}
    </div>
</div>  


<style>
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }

  button {
    padding: 7px 8px 7px 8px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    cursor: pointer;
    width: 100%;
    background-color: hsl(208, 42%, 92%);
    border: 1px solid hsl(208, 22%, 58%);
    color: hsl(208, 12%, 38%);
  }

  button:focus {
    outline: none;
  }

  button:hover {
    background-color: hsl(5, 60%, 90%);
    border: 1px solid hsl(5, 64%, 38%);
    color: hsl(5, 64%, 38%);
  }


  .dropdown-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2px;    
    width: 200px;
  }

  .label {
    font-size: 12px;
    color: rgb(60, 60, 60);
    letter-spacing: 0.8px;
  }

  span.close {
    font-weight: 700;
  }
</style>