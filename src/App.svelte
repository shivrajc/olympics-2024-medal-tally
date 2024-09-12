<script>
  import Controls from "./lib/Controls.svelte";
  import CountryDetails from "./lib/country_details/CountryDetails.svelte";
  import CountryCards from "./lib/CountryCards.svelte";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import { selectedCountry } from "./lib/stores";

</script>

<main>
  <div class="header">
    <Header />
    <Controls />
  </div>
  {#if $selectedCountry === "All"}    
    <CountryCards />
  {:else}
    <CountryDetails />
  {/if}
</main>
<Footer />
<style>
  main {
    max-width: 80%;    
    margin: 0 auto;
  }

  .header {
    border-bottom: 1px solid hsl(208, 12%, 78%);
    padding-bottom: 16px;
    margin-bottom: 32px;
  }
</style>