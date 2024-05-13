<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, CardSubtitle } from '@sveltestrap/sveltestrap';
  
    let characters = [];
    let isLoading = true;
  
    onMount(() => {
      loadCharacters();
    });
  
    async function loadCharacters() {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (response.ok) {
          const data = await response.json();
          characters = data.results;
          isLoading = false;
        } else {
          console.error('Failed to load character data');
          isLoading = false;
        }
      } catch (error) {
        console.error('Error fetching character data:', error);
        isLoading = false;
      }
    }
  </script>
  
  <main>
    <Container class="content-container" style="justify-content: center;">
      <Row>
        <Col><h1>Rick and Morty Characters</h1></Col>
      </Row>
      <hr>
      {#if isLoading}
        <p>Loading characters...</p>
      {:else}
        <Container>
          <Row cols={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }} class="justify-content-center">
            {#each characters as character}
              <Col class='mb-3'>
                <Card>
                  <CardImg top src={character.image} alt={`Character ${character.name}`} />
                  <CardBody>
                    <CardTitle tag="h5">{character.name}</CardTitle>
                    <CardSubtitle>{character.status} - {character.species}</CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            {/each}
          </Row>
        </Container>
      {/if}
    </Container>
  </main>
  