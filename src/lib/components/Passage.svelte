<script>
    import Image from './Image.svelte'
    import {onMount} from 'svelte'
    export let title, src;
    export let alt = "The output of the code above";
    export let tabs = false;
    let selected = 0;
    let slot;
    let content;

    let tabTitles = []

    let codeBlocks = []

    onMount(() => {
        if(tabs) {
            console.log(slot)
        }
        // console.log(slot.childNodes[0].attributes[0].nodeValue);
        // iterate over child nodes and create tablist
        for(let i=0; i<slot.childNodes.length; i++) {
            // This assumes a lot:
            // 1. That the first attribute is the "language" class
            // 2. That the language class is always `language-[lang]`
            // 3. That if the language is not set, the class is `language-undefined`
            let title =  slot.childNodes[i].attributes[0].nodeValue.substring("language-".length)
            if (title != 'undefined') {
                // Cast first letter as uppercase
                tabTitles = [...tabTitles, title] //.charAt(0).toUpperCase() + title.slice(1)]
            }
            codeBlocks = [...codeBlocks, slot.childNodes[i].outerHTML]
        }
    })

    let changeTab = (i) => {
        selected = i;
    }

</script>

<article class='passage card my-5'>
    {#if title}
    <header class='card-header pl-5 pt-2 pb-0'>
        <h4>{title}</h4>
    </header>
    {/if}
    
    <div class='card-content'>
        <div class='columns is-tablet'>
            <div class='code column m-0'>
                {#if tabs && tabTitles.length > 0}
                <div class='tabs is-small is-boxed m-0'>
                    <ul>
                        {#each tabTitles as tab, i}
                        <li class={i == selected ? 'is-active' : ''}><a href='#/' on:click={() => {changeTab(i)}}>{tab}</a></li>
                        {/each}
                    </ul>
                </div>
                {/if}
                <div class='passage-pre {tabs ? "has-tabs" : ""}'>
                    {#if codeBlocks.length > 0}
                        {@html codeBlocks[selected]}
                    {/if}
                </div>
            </div>
        
            {#if src}
            <div class='column has-text-centered m-0'>
                <Image src="{src}" alt="{alt}" />
            </div>
            {/if}
        </div>
    </div>
    <span bind:this={slot} style='display: none;'>
        <slot />
    </span>
</article>

<style lang='scss'>
    @import "../styles/variables.scss";
//     .code > pre {
//         background-color: red;
//         white-space: pre-wrap;       /* css-3 */
//  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
//  white-space: -pre-wrap;      /* Opera 4-6 */
//  white-space: -o-pre-wrap;    /* Opera 7 */
//  word-wrap: break-word;       /* Internet Explorer 5.5+ */
//     }
    .code > div > ul {
        padding-left: 0;
        margin-left: 0;
        margin-top: 0;
    }
    // article {
    //     border-style: solid;
    //     border-color: black;
    //     border-width: 3px;
    //     border-radius: 8px;
    // }
    header {
        background-color: $light-green;
    }
    header > h4 {
        font-style:italic;
        font-size: 1rem;
    }
</style>