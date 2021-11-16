<script>
	// import '../app.scss';
	import NSFLogo from '$lib/assets/NSFLogo.png';
	import {base} from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>Twine Trail Guide</title>
</svelte:head>

<section class='hero is-fullheight-with-navbar homepage'>
	<div class='hero-head'>
		<Nav />
	</div>
	<div class='hero-body'>
		<div class='container has-text-centered'>
			<h1 class='title'>Making Interactive Stories with Twine</h1>
			<h2 class='subtitle'>Trail Guide</h2>
			<div class='buttons is-centered'>
				<a href="{base}/trails" class='button is-primary'>Get Started</a>
				<a href="{base}/about" class='button is-secondary'>About the Guide</a>
			</div>
			
		</div>
	</div>
	<div class='hero-foot p-4 disclaimer'>
		<div class='columns is-mobile'>
			<div class='column is-narrow'>
				<img alt="The National Science Foundation logo." src={NSFLogo} style="height: 4em;" />
			</div>
			<div class='column'>
				<p class='is-tiny'>The “Reaching Across the Hallway” project is funded by the National Science Foundation under Grant Award #2010256. Learn more about licenses for this site's content and source code <a href='{base}/about'>here</a>.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.homepage {
		height: 100vh;
	}
	.is-tiny {
		font-size: 0.75rem;
	}
	.disclaimer {
		background-color: gainsboro;
	}
</style>
