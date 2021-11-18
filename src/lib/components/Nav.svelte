<script>
    import {base} from '$app/paths';
    
    let burger = {
        active: false
    }
    function toggleMenu() {
        burger.active = !burger.active;
    }
</script>

<nav class='navbar'>
    <button on:click={toggleMenu} role="button" class="navbar-burger {burger.active ? 'is-active' : ''}" aria-label="menu" aria-expanded="{burger.active}" data-target="nav-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </button>
    <div id='nav-menu' class="navbar-menu {burger.active ? 'is-active' : ''}">
        <div class="navbar-end">
            <a class="navbar-item"
                href='{base}/'
            >
                Home
            </a>
            <a class="navbar-item"
                href='{base}/about'
            >
                About the Guide
            </a>
            <a class="navbar-item"
                href='https://padlet.com/jonstapleton/kxfemonf8icwjm3l' 
            >
                Region Map
            </a>
            <a class="navbar-item"
                href='{base}/trails'
            >
                Trails
            </a>
            <a class='navbar-item'
                href="{base}/locations"
            >
                Locations
            </a>
        </div>
    </div>
</nav>