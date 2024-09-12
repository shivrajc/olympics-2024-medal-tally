<script>
  export let medalType;

</script>

<span 
  class="medal"
  class:gold={medalType === "Gold"}
  class:silver={medalType === "Silver"}
  class:bronze={medalType === "Bronze"}
>
</span>

<style>
  span.medal {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    /* border: 1px solid; */
    margin: 1px;
  }  
  .gold {
    background-color: var(--gold-color);    
    border: 1px solid var(--gold-border-color);  
  }
  .silver {
    background-color: var(--silver-color);    
    border: 1px solid var(--silver-border-color);  
  }
  .bronze {
    background-color: var(--bronze-color);    
    border: 1px solid var(--bronze-border-color);  
  }
</style>