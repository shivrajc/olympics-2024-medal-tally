<script>
  import MedalDot from "../MedalDot.svelte";


  export let sportData;
</script>

<div class="container">
  {#each sportData.filter(d => d.medal_type === "Gold") as sport}    
    <p class="event-text">
      <span class="event-heading">{sport.event}</span>
      <MedalDot medalType={sport.medal_type} />
    </p> 
  {/each}
  {#each sportData.filter(d => d.medal_type === "Silver") as sport}
    <p class="event-text">
      <span class="event-heading">{sport.event}</span>
      <MedalDot medalType={sport.medal_type} />
    </p> 
  {/each}
  {#each sportData.filter(d => d.medal_type === "Bronze") as sport}
    <p class="event-text">
      <span class="event-heading">{sport.event}</span>
      <MedalDot medalType={sport.medal_type} />
    </p> 
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .event-text {
    display: flex;
    padding: 4px 16px;
    border: 1px solid rgb(158, 158, 158);
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
    font-size: 16px;
    color: rgb(92, 92, 92);
  }

  .gold {
    background-color: var(--gold-light-color);
    color: var(--gold-border-color);
    border-color: var(--gold-border-color);    
    opacity: 0.8;
  }
</style>