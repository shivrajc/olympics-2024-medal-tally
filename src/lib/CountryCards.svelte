<script>
  import {fade, scale} from 'svelte/transition';
  import CountrtyCard from "./CountryCard.svelte";
  import { countryData, selectedCountry } from "./stores";

  function UpdateCountrySelection(country) {
    selectedCountry.set(country);
    window.scrollTo(0, 0);
  }
</script>

{#if $countryData}  
  <div class="container" in:fade out:scale>  
    {#each $countryData as {country}, index}
      <CountrtyCard {country} {index} on:click={() => UpdateCountrySelection(country)}/>
    {/each}
  </div>
{/if}

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: auto;
    gap: 32px;
  }  
</style>