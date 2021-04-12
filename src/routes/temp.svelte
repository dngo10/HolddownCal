<script>
    //Basically Svelte update based on variable
    //A simple rule of thumb: the name of the updated variable must appear on the left hand side of the assignment. For example this...
    let count = 2;
    $: double = count * 2;
    $: console.log(`the count is ${count}`);

</script>

<!--
{#each things as thing (thing.id)}

This is to make sure things ARE IN ORDER
-->


<p>{count} double is {double}</p>