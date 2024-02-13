<script lang="ts">
	import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
	var scrollerIndex = 0;
    function incrIndex() {
        if (browser) {
				document.getElementById("scroller")!.scrollLeft += 1
        }
    }
    let clear: number;
    onMount(() => {
        clearInterval(clear);
        clear = setInterval(incrIndex, 20);
    });
	onDestroy(() => {
		clearInterval(clear)
	})
</script>

<div id="scroller">
	<slot></slot>
</div>

<style>
	div {
		padding: 12px;
		width: 100vh;
		display: flex;
		overflow-y: scroll;
		scrollbar-width: none;
		overscroll-behavior: none;
		
		/* scroll-snap-type: x mandatory; */
	}
	div::-webkit-scrollbar {
		display: none;
	}
</style>