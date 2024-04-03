<script>
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
</script>
<svelte:head>
    <title>SOS2324-12 Project</title>
</svelte:head>
<main>
    <Header/>
    <slot></slot>
    <Footer/>
</main>
