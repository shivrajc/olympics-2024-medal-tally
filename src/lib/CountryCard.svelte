<script>
  import {fade, slide, scale} from 'svelte/transition';
  import MedalGroup from "./MedalGroup.svelte";
  import MedalLabels from "./MedalLabels.svelte";
  import { sortCountriesBy, selectedSport, filteredData } from "./stores";

  export let country;
  export let index;

  $: cData = $filteredData.filter(d => d.country === country).filter(d => $selectedSport === "All" ? true : d.sport === $selectedSport);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="container"
  on:click
>
  <div class="country-header" in:fade>    
    <span class="heading">{$sortCountriesBy === "Alphabetical" ? "" : (index+1).toString()+"."} {country}</span>
    <!-- <span class="total"><span class="total-label">TOTAL</span> {cData.length}</span> -->
  </div>
  <div class="medal-labels">
    <MedalLabels {country} size={40} />
  </div>
  <MedalGroup {cData} />
</div>

<style>
  .container {
    padding: 32px;
    background-color: white;
    border-radius: 4px;    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px;        
    cursor: pointer;
    transition: box-shadow 250ms ease;
  }

  .container:hover {
    /* box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px; */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    /* border: 1px solid darkcyan; */
  }

  .heading {
    font-size: 22px;
    font-weight: 400;
  }

  .country-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0px;
    margin-bottom: 12px;
  }

  .medal-labels {
    margin: 20px 0 20px 0;
  }
</style>