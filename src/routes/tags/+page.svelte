<script>
    // @ts-nocheck
    import { database } from "$lib/firebase.js";
    import { ref, child, set, get, push, update, onValue, remove } from "firebase/database";
    import Tag from "$lib/Tag";
    import { onMount } from "svelte";

    let tag = new Tag();
    let tags = new Map();

    onMount(() => {
        onValue(ref(database, "tags"), snap => {
            tags = snap.val();
            console.log(tags);
        });
    });

    function addTag() {
        if (tag.value.replaceAll(" ", "").length > 0) {
            push(ref(database, "tags"), tag.value);
        }
        tag = new Tag();
    }
</script>

<div class="d-flex align-items-center">
    <div class="input-group me-2 w-auto">
        <input
            bind:value={tag.value}
            on:keydown={e => {
                if (e.key == "Enter" && !Object.values(tags).includes(tag.value)) addTag();
            }}
            class="form-control"
            placeholder="новый тег"
        />
        <button
            class="btn btn-light border-secondary"
            on:click={() => {
                if (!Object.values(tags).includes(tag.value)) addTag();
            }}><i class="fa-solid fa-circle-plus" /></button
        >
    </div>

    {#each Object.entries(tags) as [key, item]}
        <div class="badge bg-light text-dark me-1">
            <span style="cursor: default;">{item}</span>
            <span
                class="text-danger ms-1"
                style="cursor:pointer"
                on:click={() => {
                    remove(ref(database, `tags/${key}`));
                }}>x</span
            >
        </div>
    {/each}
</div>
