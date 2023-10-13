<script lang="ts">
  import "../../lib";
</script>

<main>
  <h1>Hello World!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <p class="container">
    <feedbacky-widget project-id="49c1ecc2-072c-4e9a-8a83-5a0b2a5d6969" />
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    line-height: 1.1;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .container {
      display: inline-block;
      max-width: 320px;
    }
  }
</style>
