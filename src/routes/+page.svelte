<script>
export let data;

// console.log(`data`, data);
</script>


<h1>Test para Iñiguez</h1>
<!-- <aside>
	<ul>
		{#each data.post as p}
                <h5>{p.title}</h5>
                <p>{p.excerpt}</p>
                <small>Duración: {p.duration} segundos</small>
                <small>Se publicó: {new Date(p.published_at *1000).getUTCDay() } / {new Date(p.published_at *1000).getUTCMonth() } / {new Date(p.published_at *1000).getUTCFullYear() }</small>
	
		{/each}
	</ul>
</aside> -->

<p>Número del siguiente episodio:</p>
<p><strong>{data.result.nextEpisodeNumber}</strong></p>
<p>Duración total de todos los episodios:</p>
<p><strong>{data.result.totalDuration}</strong> segundos</p>
<p>Número del capítulo más corto:</p>
<p><strong>{data.result.shortestEpisodeNumber}</strong></p>
<p>Títulos por debajo de las dos horas:</p>
{#each data.result.selectedTitles as title}
 <p><strong>{title}</strong></p>   
{/each}


<style>
    h1 {
        text-align: center;
    }
</style>
