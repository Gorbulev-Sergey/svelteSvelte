<script>
    // @ts-nocheck
    import { database } from "../../firebase/firebase.js";
    import { ref, child, set, get, push, update, onValue } from "firebase/database";
    import { onMount } from "svelte";

    let post = { title: "", text: "", image: null };
    let posts = [];

    onMount(() => {
        onValue(ref(database, "posts"), snap => {
            posts = Object.values(snap.val());
            console.log(posts);
        });
    });
</script>

<div class="p-3 rounded bg-light mb-4">
    <h5 class="mb-3 ps-1">Добавить новую публикацию</h5>
    <div class="row">
        <div class="col">
            <input bind:value={post.title} class="form-control mb-3" placeholder="Заголовок" />
            <input bind:value={post.text} class="form-control mb-3" placeholder="Текст" />
            <input bind:value={post.image} class="form-control mb-3" placeholder="Адрес картинки" />
            <button
                class="btn btn-dark"
                on:click={() => {
                    const key = push(child(ref(database), "posts")).key;
                    update(ref(database, `posts/ ${key}`), post);
                    post = { title: "", text: "" };
                }}>Сохранить</button
            >
        </div>
        <div class="col-2"><img class="img-fluid rounded" src={post.image} alt="" /></div>
    </div>
</div>

<div class="row row-cols-1 row-cols-md-4 g-4">
    {#each posts as item}
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text">{item.text}</p>
                </div>
                {#if item.image != null}
                    <img src={item.image} class="card-img-bottom" alt="..." />
                {/if}
            </div>
        </div>
    {/each}
</div>
