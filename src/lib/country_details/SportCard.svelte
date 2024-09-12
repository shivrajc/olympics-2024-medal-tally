<script>
  import MedalGroup from "../MedalGroup.svelte";
  import MedalLabelsBySport from "../MedalLabelsBySport.svelte";
  import EventList from "./EventList.svelte";

  export let heading;
  export let contentData;

</script>

<div class="container">    
  <div class="heading">
    <p class="heading-text">{heading}</p>
    <div class="medal-labels">
      <MedalLabelsBySport sportData={contentData} size={36} />
    </div>
    <div class="medal-group">
      <EventList sportData={contentData} />
    </div>    
  </div>
</div>

<style>
  .container {
    height: 100%;
    padding: 20px;
    border: 0.6px solid rgb(188, 188, 188);
    /* box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;     */
  }

  .medal-labels {
    margin-bottom: 20px;
  }

  .heading-text {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
</style>