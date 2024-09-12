<script>
  export let medalType;
  export let medals;
  export let size;
  export let isSport = false;

</script>

<div class="container" 
  >
  <div 
    class="circle"
    class:total={medalType === "Total"}
    class:gold={medalType === "Gold"}
    class:silver={medalType === "Silver"}
    class:bronze={medalType === "Bronze"}
    style="width: {size}px;height: {size}px;"
  >
    <span 
      class="value"
      style="font-size: {size/2}px"
    >{medals}</span>
  </div>
  <span 
    class="medal-type-label"   
    style="font-size: {isSport ? size/2.4 : size/4}px"    
    class:total-text={medalType === "Total"}
    class:gold-text={medalType === "Gold"}
    class:silver-text={medalType === "Silver"}
    class:bronze-text={medalType === "Bronze"}     
  >{medalType}</span>
  <!-- <span class="label">{medalType}</span> -->
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    gap: 4px;
  }

  .circle {
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    border: 2px solid;
    justify-content: center;
    align-items: center;       
  }

  .medal-type-label {
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .total {
    background-color: white;
    color: rgb(120, 120, 120);    
    border-color: rgb(120, 120, 120);
  }

  .gold {
    background-color: var(--gold-light-color);
    color: var(--gold-border-color);
    border-color: var(--gold-border-color);
  }
  .silver {
    background-color: var(--silver-light-color);
    color: var(--silver-border-color);
    border-color: var(--silver-border-color);
  }
  .bronze {
    background-color: var(--bronze-light-color);
    color: var(--bronze-border-color);
    border-color: var(--bronze-border-color);
  }
  .total-text {
    color: rgb(120, 120, 120);
  }

  .gold-text {
    color: var(--gold-border-color);
  }
  .silver-text {
    color: var(--silver-border-color);
  }
  .bronze-text {
    color: var(--bronze-border-color);
  }

  .value {
    font-weight: 500;
    line-height: 1;
  }

</style>