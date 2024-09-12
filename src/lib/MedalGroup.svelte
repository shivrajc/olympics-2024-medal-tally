<script>
  import MedalDot from "./MedalDot.svelte";
  export let cData;
</script>

<div class="container">
  {#each cData.filter(d => d.medal_type === "Gold") as countryD}    
    <MedalDot medalType="Gold" />
  {/each}
  {#each cData.filter(d => d.medal_type === "Silver") as countryD}
  <MedalDot medalType="Silver" />
  {/each}
  {#each cData.filter(d => d.medal_type === "Bronze") as countryD}
  <MedalDot medalType="Bronze" />
  {/each}
</div>      

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 14px);
    grid-template-rows: auto;    
  }
</style>