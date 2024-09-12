<script>
  export let value;
  export let options;
</script>

<div class="select-dropdown">
  <select bind:value={$value}>
    {#each options as option}
      <option>{option}</option> 
    {/each}
  </select>
</div>

<style>
  .select-dropdown,
  .select-dropdown * {
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
  }
  .select-dropdown {
    position: relative;    
    display: flex;
    flex-direction: column; 
    border-radius: 0px;
    width: 100%;

  }
  .select-dropdown select {
    font-size: 1rem;
    font-weight: normal;
    max-width: 100%;
    padding: 8px 24px 8px 12px;
    border: 1px solid lightgray;
    background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
    appearance: none;
    background-color: white;
  }
  .select-dropdown select:active, .select-dropdown select:focus {
    outline: none;
    box-shadow: none;
  }
  .select-dropdown:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 14px;
    width: 0;
    height: 0;
    margin-top: -2px;
    border-top: 5px solid #aaa;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }  
  span {
    font-size: 14px;
  }
</style>