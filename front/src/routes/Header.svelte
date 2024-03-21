<script>
    import { dev } from '$app/environment';
    import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink
  } from '@sveltestrap/sveltestrap';

  let API = '/api/v1';
    if (dev)
        API = 'http://localhost:10000'+API;

</script>
<style>
    @import "/styles.css";
</style>

<main> 
    <Nav tabs class="fixed-navbar" style="background-color: white; justify-content: center;"> 
        <NavItem class="nav-item"> 
            <NavLink href="/" class="nav-link d-flex align-items-center"> 
                <img src="/home-icon.png" alt="Casa" style="width: 20px; height: 20px; margin-right: 5px;"> 
                Inicio 
            </NavLink> 
        </NavItem>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-api.png" alt="API" style="width: 20px; height: 20px; margin-right: 5px;"> 
                APIS
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem class="menu-item" href = "{API}/airbnb-listings">airbnb-listings (Jose Martinez)</DropdownItem>
                <DropdownItem class="menu-item" href = "{API}/world-consumption-of-drinking-water-data">world-consumption-of-drinking-water-data (Jose Joaquin Mena-Bernal)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-github.png" alt="GitHub" style="width: 20px; height: 20px; margin-right: 5px;"> 
                GitHub
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem class="menu-item" href = "https://github.com/josmarsua">josmarsua</DropdownItem>
                <DropdownItem class="menu-item" href = "https://github.com/borfloave">borfloave</DropdownItem>
                <DropdownItem class="menu-item" href = "https://github.com/josmenrue">josmenrue</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-frontend.png" alt="Frontends" style="width: 20px; height: 20px; margin-right: 5px;"> 
                Frontends
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem class="menu-item" href = "/airbnb-listings">airbnb-listings (Jose Martinez)</DropdownItem>
                <DropdownItem class="menu-item" href = "/world-consumption-of-drinking-water-data">world-consumption-of-drinking-water-data (José Joaquin Mena)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-documentacion.png" alt="Documentaciones" style="width: 20px; height: 20px; margin-right: 5px;"> 
                Documentaciones
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem class="menu-item" href = "{API}/airbnb-listings/docs">airbnb-listings (Jose)</DropdownItem>
                <DropdownItem class="menu-item" href = "{API}/global-food-prices/docs">global-food-prices (Borja)</DropdownItem>
                <DropdownItem class="menu-item" href = "{API}/world-consumption-of-drinking-water-data/docs">world-consumption-of-drinking-water-data (Jose Joaquin)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Nav>
</main>