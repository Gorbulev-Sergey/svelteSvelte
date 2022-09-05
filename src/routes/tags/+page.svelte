<script>
    // @ts-nocheck
    import { database } from "../../firebase/firebase.js";
    import { ref, child, set, get, push, update, onValue, remove } from "firebase/database";
    import { onMount } from "svelte";

    let tag = { key: "", value: "" };
    let tags = new Map();

    onMount(() => {
        onValue(ref(database, "tags"), snap => {
            tags = snap.val();
            console.log(tags);
        });
    });
</script>

<input
    bind:value={tag.value}
    on:keydown={e => {
        if (e.key == "Enter" && !Object.values(tags).includes(tag.value)) {
            push(ref(database, "tags"), tag.value);
            tag = { key: "", value: "" };
        }
    }}
    class="form-control mb-3"
    placeholder="тег"
/>
<button
    class="btn btn-dark"
    on:click={() => {
        if (!Object.values(tags).includes(tag.value)) {
            push(ref(database, "tags"), tag.value);
            tag = { key: "", value: "" };
        }
    }}>Добавить</button
>

<div class="mt-5">
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
