<script>
	// import '../app.scss';
	import NSFLogo from '$lib/assets/NSFLogo.png';
	import CodeVA from '$lib/assets/CodeVALogo.png';
	import {base} from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
</script>

<sveltekit:head>
	<title>Twine Trail Guide</title>
</sveltekit:head>

<section class='hero is-fullheight-with-navbar homepage'>
	<div class='hero-head'>
		<Nav />
	</div>
	<div class='hero-body'>
		<div class='container has-text-centered'>
			<h1 class='title'>Making Interactive Stories with Twine</h1>
			<h2 class='subtitle'>Chapbook Trail Guide</h2>
			<div class='buttons is-centered'>
				<a href="{base}/trails" class='button is-primary'>Get Started</a>
				<a href="{base}/about" class='button is-secondary'>About the Guide</a>
			</div>
			
		</div>
	</div>
	<div class='hero-foot p-4 disclaimer'>
		<div class='columns is-mobile is-vcentered'>
			<div class='column is-narrow'>
				<img alt="The National Science Foundation logo." src={NSFLogo} style="height: 4em;" />
			</div>
			<div class='column is-narrow'>
				<img alt="The CodeVA logo" src={CodeVA} style="height: 3.5rem;" />
			</div>
			<div class='column'>
				<p class='is-tiny'>The "CS for Social Studies" project is created by <a href="https://codevirginia.org">CodeVA</a> and is funded by the National Science Foundation under Grant Award #2010256. Learn more about licenses for this site's content and source code <a href='{base}/about'>here</a>.</p>
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
