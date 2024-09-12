<script>
	import * as d3 from "d3";
	import { pieData } from "../stores";

	export let width = 500;
  export let height = 400;
  export let colorScale;

  $: pie = d3.pie()
		.sort(null)
		.value(d => d.medals);

  $: arcPath = d3.arc()
		.innerRadius(Math.min(width, height) / 4)
		.outerRadius(Math.min(width, height) / 2.7 - 1);

  $: labelRadius = arcPath.outerRadius()() * 0.82;

  $: arcLabel = d3.arc()
		.innerRadius(labelRadius)
		.outerRadius(labelRadius);

  $: arcs = pie($pieData);
</script>

<svg
  {width}
  {height}
  viewBox="{-width / 2}, {-height / 2}, {width}, {height}"
>
	<g class="$pieData">

		{#each arcs as slice}
			<path 
				d={arcPath(slice)}
				fill={colorScale(slice.data.gender)}
				stroke="white"
				/>
			
			{#if (slice.endAngle - slice.startAngle) > 0.25}
				<text
          class="chart-labels"        
					transform="translate({[arcLabel.centroid(slice)[0], arcLabel.centroid(slice)[1]]})"
					>
					{slice.data.medals.toLocaleString("en-US")}
				</text>
			{/if}
		{/each}
	</g>
</svg>

<style>
	svg {
    display: block;
    width: 100%;
    height: 100%;
	}

  path {
    opacity: 1;
  }

  .chart-labels {
    font-size: 20px;
    font-weight: 700;
    text-anchor: middle;
    fill: white;
  }
</style>
