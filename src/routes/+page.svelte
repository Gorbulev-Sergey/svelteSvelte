<script>
    // @ts-nocheck
    import { database } from "$lib/firebase.js";
    import { ref, child, set, get } from "firebase/database";
    import { onMount } from "svelte";

    let users = [];

    onMount(() => {
        // set(ref(database, "users/" + "3"), {
        //   username: "Дождик",
        //   email: "gor@rr.t",
        //   age: 1,
        // });

        get(child(ref(database), "users")).then(snap => {
            if (snap.exists()) {
                users = snap.val();
                console.log(users);
            }
        });
    });
</script>

{#each users as item}
    {#if item != null}
        <p class="alert alert-info">
            {item.name}, email:{item.email}, возраст:{item.age}
        </p>
    {/if}
{/each}
