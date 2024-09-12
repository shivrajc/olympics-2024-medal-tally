<script>
  import * as d3 from "d3";  
  import { medalsByDate } from "../stores"; 


  export let width=280;
  export let height=500;  

  const marginTop = 40;
  const marginRight = 10;
  const marginBottom = 80;
  const marginLeft = 10;
  const dotChartheight = 70;
  const headerHeight = 30;

  $: innerWidth = width - marginLeft - marginRight ;
  $: innerHeight = height - marginTop - marginBottom - dotChartheight;
 
  $: xScale = d3.scaleUtc(
    d3.extent($medalsByDate, (d) => new Date(d.date)),
    [0, innerWidth]
  );

  $: rScale = d3.scaleSqrt(
    [1, 20],
    [6, 40]
  );

  $: textScale = d3.scaleSqrt(
    [1, 20],
    [10, 20]
  );

  $: yScale = d3.scaleLinear(
    [0, d3.max($medalsByDate, (d) => d.cumulative_medals)],
    [innerHeight, 0]
  );

  $: line = d3
    .line()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d.cumulative_medals))
    .curve(d3.curveStepAfter);

  $: area = d3
    .area()
    .x((d) => xScale(new Date(d.date)))
    .y0(innerHeight)
    .y1((d) => yScale(d.cumulative_medals))
    .curve(d3.curveStepAfter);
</script>

<svg {width} {height}>

  
<g transform="translate({marginLeft} {marginTop})">  
    
  <!-- <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="8" style="stroke:blue; stroke-width:1" />
  </pattern> -->

  <g class="line-area-paths">
    <path class="area" d={area($medalsByDate)} />
    <path class="line" fill="none" stroke="steelblue" stroke-width="1.5" d={line($medalsByDate)} />
  </g>
  <g class="step-chart-labels">
    {#each $medalsByDate as d, i}
      {#if i === 0}
      <text
        x={xScale(d.date)}
        y={yScale(d.cumulative_medals)-8}
        class="label"
      >
        {d.cumulative_medals}
      </text>      
      {/if}
      {#if i>0 && d.cumulative_medals !== $medalsByDate[i-1].cumulative_medals }
        <text
          x={xScale(d.date)}
          y={yScale(d.cumulative_medals)-8}
          class="label"
        >
          {d.cumulative_medals}
        </text>
      {/if}
    {/each}
  </g>
  <g transform="translate(0,{innerHeight})">
    {#each $medalsByDate.map(d => d.date) as tick, i}
      <line        
        class="tick-line"
        x1={xScale(tick)}
        x2={xScale(tick)}
        y1={0}
        y2={5}
      />

      <text class="x-axis-labels" x={xScale(tick)} y={20}>
        {i + 1}
      </text>
    {/each}
  </g>
  <text
    class="x-axis-header"
    x={-2}
    y={innerHeight+36}
  >
    DAY OF THE TOURNAMENT &#x2192;
  </text>  

  <g transform="translate(0,{innerHeight})">
  {#each $medalsByDate as d, i}
    {#if d.medals >= 1}      
      <circle
        cx={xScale(d.date)}
        cy={dotChartheight + 10}
        r={rScale(d.medals)}
        class="medal-dot"
      >
      </circle>
      <text
        x={xScale(d.date)}
        y={dotChartheight + 11}
        class="medal-dot-text"
      >{d.medals}</text>
    {/if}
  {/each}  
  </g>
</g>
</svg>

<style>
  svg {
    display: block;
    overflow: visible; 
    width: 100%;
    height: 100%;
  }

  .line {
    stroke: var(--area-color);
    stroke-width: 2;
  }

  .area {
    fill: rgb(210, 230, 245);
  }

  .label {
    text-anchor: middle;
    font-size: 14px;
    fill: var(--area-color);
    font-weight: 600;
  }

  .x-axis-labels {
    font-size: 14px;
    text-anchor: middle;
  }

  .tick-line {
    stroke: #aaa;
  }

  .x-axis-header {
    font-size: 10px;
    letter-spacing: 0.8px;
    fill: rgb(129, 133, 137);
  }

  .medal-dot {
    fill: none;
    stroke: var(--area-color);
    stroke-width: 1;    
  }

  .medal-dot-text {
    text-anchor: middle;
    dominant-baseline: middle;
    font-size: 12px;
    font-weight: 600;
    fill: var(--area-color);
  }
</style>