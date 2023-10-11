<script>
  export let data;

  //  console.log(`data`, data);
</script>

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
<main>
  {#if data.result.todosLosDatosSonInvalidos}
    <h2>{data.result.todosLosDatosSonInvalidos}</h2>
  {:else}
    <div class="basic-card basic-card-aqua">
      <div class="card-content">
        <span class="card-title">Test para Iñiguez</span>
        <p class="card-text">Número del siguiente episodio:</p>
        <p class="card-text">
          <strong>{data.result.nextEpisodeNumber}</strong>
        </p>
        <p class="card-text">Duración total de todos los episodios:</p>
        <p class="card-text">
          {data.result.totalDuration} segundos
        </p>
        <p class="card-text">Número del capítulo más corto:</p>
        <p class="card-text">
          <strong>{data.result.shortestEpisodeNumber}</strong>
        </p>
        <span class="card-title">Títulos por debajo de las dos horas:</span>
        {#each data.result.selectedTitles as title}
          <p class="card-text">{title}</p>
        {/each}
      </div>
    </div>

    {#if data.result.errorReport.haveErrors > 0}
      <div class="basic-card basic-card-lips">
        <div class="card-content">
          <p class="card-text">
            No se han tenido en cuenta {data.result.errorReport.haveErrors} posts.
          </p>
          <p class="card-text">{data.result.errorReport.totalErrors}</p>
        </div>
      </div>
    {:else}
      <p class="noerror">La api ha devuelto todos los posts correctamente</p>
    {/if}
  {/if}
</main>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
    :global(body)  {
        background-color: rgb(48, 16, 78);
        font-family: 'Young Serif', serif;

    }

    h2, span {
        font-family: 'Young Serif', serif;
    }
  main {
    margin-left: 35vw;
    margin-top: 10vh;
  }

  .noerror {
    color: #99a3d4;
  }

  /* Basic Card */
  .basic-card {
    width: 600px;
    position: relative;

    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  }

  .basic-card .card-content {
    padding: 30px;
  }

  .basic-card .card-title {
    font-size: 25px;
  }

  .basic-card .card-text {
    line-height: 1.6;
  }

  .basic-card .card-link a:after {
    top: 30px;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    width: 0;

    -webkit-transition: width 0.3s ease 0s, left 0.3s ease 0s;
    -moz-transition: width 0.3s ease 0s, left 0.3s ease 0s;
    -o-transition: width 0.3s ease 0s, left 0.3s ease 0s;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
  }

  .basic-card .card-link a:hover:after {
    width: 100%;
    left: 0;
  }

  .basic-card-aqua {
    background-image: linear-gradient(to bottom right, #00bfad, #99a3d4);
  }

  .basic-card-aqua .card-content,
  .basic-card .card-link a {
    color: #fff;
  }

  .basic-card-aqua .card-link {
    border-top: 1px solid #82c1bb;
  }

  .basic-card-aqua .card-link a:after {
    background: #fff;
  }

  .basic-card-lips {
    background-image: linear-gradient(to bottom right, #ec407b, #ff7d94);
  }

  .basic-card-lips .card-content {
    color: #fff;
  }

  .basic-card-lips .card-link {
    border-top: 1px solid #ff97ba;
  }

  .basic-card-lips .card-link a:after {
    background: #fff;
  }
</style>
