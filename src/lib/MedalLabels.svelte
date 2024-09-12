<script>
  import MedalLabel from "./MedalLabel.svelte";
  import { countryData } from "./stores";

  export let country;
  export let size;  
  let medalTypeCount;

  $: cData = $countryData.filter(d => d.country === country)[0];
  $: {
    if (cData) {
      medalTypeCount =
      (cData.gold_medals === undefined || cData.gold_medals <= 0 ? 0 : 1) 
      +
      (cData.silver_medals === undefined || cData.silver_medals <= 0 ? 0 : 1)
      +
      (cData.bronze_medals === undefined || cData.bronze_medals <= 0 ? 0 : 1);
    }    
  } 
</script>

{#if cData}
  <div class="container" style="gap:{size/2}px">  
    
    {#if medalTypeCount > 1}
      <MedalLabel medalType="Total" medals={cData.total_medals} {size} />      
    {/if}
    {#if cData.gold_medals > 0}
      <MedalLabel medalType="Gold" medals={cData.gold_medals} {size} />
    {/if}
    {#if cData.silver_medals > 0}
      <MedalLabel medalType="Silver" medals={cData.silver_medals} {size} />
    {/if}
    {#if cData.bronze_medals > 0}
      <MedalLabel medalType="Bronze" medals={cData.bronze_medals} {size} />
    {/if}
  </div>
{/if}

<style>
  .container {
    display: flex;
    gap: 12px;
  }
</style>