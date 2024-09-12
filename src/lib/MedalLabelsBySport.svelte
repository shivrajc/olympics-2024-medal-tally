<script>
  import MedalLabel from "./MedalLabel.svelte";

  export let sportData;
  export let size;
  let medalTypeCount;

  $: sData = {
      total_medals: sportData.length,
      gold_medals: sportData.filter(d => d.medal_type === "Gold").length,
      silver_medals: sportData.filter(d => d.medal_type === "Silver").length,
      bronze_medals: sportData.filter(d => d.medal_type === "Bronze").length,
    }

  $: {
    if (sData) {
      medalTypeCount =
      (sData.gold_medals === undefined || sData.gold_medals <= 0 ? 0 : 1) 
      +
      (sData.silver_medals === undefined || sData.silver_medals <= 0 ? 0 : 1)
      +
      (sData.bronze_medals === undefined || sData.bronze_medals <= 0 ? 0 : 1);
    }    
  }     
</script>

{#if sData}
  <div class="container" style="gap:{size/2}px">  
    
    {#if medalTypeCount > 1}
      <MedalLabel medalType="Total" medals={sData.total_medals} {size} isSport={true}/>      
    {/if}
    {#if sData.gold_medals > 0}
      <MedalLabel medalType="Gold" medals={sData.gold_medals} {size} isSport={true}/>
    {/if}
    {#if sData.silver_medals > 0}
      <MedalLabel medalType="Silver" medals={sData.silver_medals} {size} isSport={true}/>
    {/if}
    {#if sData.bronze_medals > 0}
      <MedalLabel medalType="Bronze" medals={sData.bronze_medals} {size} isSport={true}/>
    {/if}
  </div>
{/if}

<style>
  .container {
    display: flex;
    gap: 12px;
  }
</style>