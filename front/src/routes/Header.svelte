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

  let API_v2 = '/api/v2';
    if (dev)
        API_v2 = 'http://localhost:10000'+API_v2;

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
                <Dropdown direction="right" nav autoClose={true}>
                    <DropdownToggle nav class="nav-link" caret>v1</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem class="menu-item" href = "{API}/airbnb-listings">airbnb-listings</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API}/world-consumption-of-drinking-water-data">world-consumption-of-drinking-water-data</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API}/global-food-prices">global-food-prices</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown direction="right" nav autoClose={true}>
                    <DropdownToggle nav class="nav-link" caret>v2</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem class="menu-item" href = "{API_v2}/airbnb-listings">airbnb-listings</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API_v2}/world-consumption-of-drinking-water-data">world-consumption-of-drinking-water-data</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API_v2}/global-food-prices">global-food-prices</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
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
                <DropdownItem class="menu-item" href = "/airbnb-listings">airbnb-listings</DropdownItem>
                <DropdownItem class="menu-item" href = "/world-consumption-of-drinking-water-data">world-consumption-of-drinking-water-data</DropdownItem>
                <DropdownItem class="menu-item" href = "/global-food-prices">global-food-prices</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-grafica.png" alt="Frontends" style="width: 20px; height: 20px; margin-right: 5px;"> 
                Vistas
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem class="menu-item" href = "/airbnb-listings/vistas">airbnb-listings</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav autoClose={true}>
            <DropdownToggle nav class="nav-link" caret>
                <img src="/icono-documentacion.png" alt="Documentaciones" style="width: 20px; height: 20px; margin-right: 5px;"> 
                Documentaciones
            </DropdownToggle>
            <DropdownMenu>
                <Dropdown direction="right" nav autoClose={true}>
                    <DropdownToggle nav class="nav-link" caret>v1</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem class="menu-item" href = "{API}/airbnb-listings/docs">airbnb-listings</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API}/world-consumption-of-drinking-water-data/docs">world-consumption-of-drinking-water-data</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API}/global-food-prices/docs">global-food-prices</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown direction="right" nav autoClose={true}>
                    <DropdownToggle nav class="nav-link" caret>v2</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem class="menu-item" href = "{API_v2}/airbnb-listings/docs">airbnb-listings</DropdownItem>
                        <DropdownItem class="menu-item" href = "{API_v2}/world-consumption-of-drinking-water-data/docs">world-consumption-of-drinking-water-data</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </Dropdown>
    </Nav>
</main>