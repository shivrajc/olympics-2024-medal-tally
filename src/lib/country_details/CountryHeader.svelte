<script>
  import MedalLabels from "../MedalLabels.svelte";
import { countryData } from "../stores";
  import { selectedCountry } from "../stores";  

  $: cData = $countryData.filter(d => d.country === $selectedCountry)[0];
</script>

{#if cData}  
  <div class="container">
    <p class="country-name">{cData.country}</p>
    <div class="medal-labels">
      <MedalLabels country={cData.country} size={60} />    
    </div>
  </div>
{/if}

<style>
  .container {
    display: flex;
    align-items: center;        
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100px;
    /* background-color: white;     */
  }
  .country-name {
    font-size: 3.2rem;
    margin-bottom: 8px;
  }
  .medal-labels {
    /* margin: 20px 0 20px 0; */
  }
</style>
