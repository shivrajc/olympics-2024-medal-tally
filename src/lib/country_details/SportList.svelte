<script>
  import SportCard from "./SportCard.svelte";
  import { sportsData, filteredData } from "../stores"; 

</script>

<div class="container">  
  {#each $sportsData as sport}
    <div class="accordion-item">
    <SportCard heading={sport.sport} contentData={$filteredData.filter(d => d.sport === sport.sport)} />    
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(1fr, 160px));
    gap: 16px;
  }

</style>