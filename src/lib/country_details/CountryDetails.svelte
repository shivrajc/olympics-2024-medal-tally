<script>
  import {fade, slide, scale} from 'svelte/transition';
  import CountryHeader from "./CountryHeader.svelte";
  import LineChart from "./LineChart.svelte";
  import AccordionList from "./SportList.svelte";
  import PieChart from "./PieChart.svelte";
  import { medalsByDate, pieData } from "../stores";
  import { utcFormat, min, max, scaleOrdinal } from "d3";  

  let width;
  let height;

  let pieWidth;
  let pieHeight;

  const genderArray = Array.from(new Set($pieData.map(d => d.gender)));
  const colorArray = ["mediumaquamarine", "orchid", "lightslategray", "silver"];

  const colorScale = scaleOrdinal()
		.domain(["Male", "Female", "Mixed Gender", "Any Gender"])
		.range(colorArray)
</script>

<div class="container" in:slide>
  <CountryHeader />
  <div class="main-container">
    <div class="line-chart-container" bind:clientWidth={width} bind:clientHeight={height} >
      <div class="line-chart-header">
        <p>Cumulative Medals by Day</p>
        <p class="line-chart-sub-header">
          {utcFormat("%d %b, %Y")(min($medalsByDate, d => d.date))} &#8212; {utcFormat("%d %b, %Y")(max($medalsByDate, d => d.date))}
        </p>
      </div>
      <div class="line-chart">        
        <LineChart width={width-80} height={height-80} />
      </div>      
    </div>
    <div class="pie-chart-container"  bind:clientWidth={pieWidth} bind:clientHeight={pieHeight} >
      <div class="pie-chart-header">
        <p>Medals by Gender</p>
        <p class="pie-chart-legend">
          {#each genderArray as gender, i}
            <span 
              class="gender-text"
              style="color: {colorScale(gender)};"  
            >              
              {gender}
            </span>
            {#if i+1 !== genderArray.length}
              <span style="color: gray">&#8226;</span>
            {/if}
          {/each}
        </p>
      </div>
      <div class="pie-chart">
        <PieChart width={pieWidth} height={pieHeight} {colorScale} />
      </div>
    </div>
  </div>
  <div class="sports-chart">
    <p class="sports-header">MEDALS BY SPORT</p>
    <AccordionList />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 40px;    
  }

  .main-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: auto;
    gap: 40px;
  }
  
  .pie-chart-container, .line-chart-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr;
    padding: 40px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px;        
    max-height: 500px;   
    min-height: 400px; 
  }

  .pie-chart-header, .line-chart-header {
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 1.2px;    
  }
  
  
  .pie-chart-legend {
    display: flex;    
    align-items: center;
    font-size: 16px;
    gap: 12px;
  }

  .gender-text {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.1px;
  }
  
  .line-chart-sub-header {
    font-size: 16px;
    fill: gray;
  }
  
  .sports-chart {
    background-color: white;
    padding: 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px;        
  }
  
  .sports-header {
    font-size: 24px;
    letter-spacing: 1.2px;
    margin-bottom: 24px;
  }
</style>