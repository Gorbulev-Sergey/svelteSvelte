<script>
    // @ts-nocheck
    import { database } from "../../firebase/firebase.js";
    import { ref, child, set, get, push, update, onValue } from "firebase/database";
    import { onMount } from "svelte";
    import { assign } from "svelte/internal";

    let post = { key: "", value: { title: "", text: "", image: null } };
    let mapPosts = new Map();
    let posts = [];

    onMount(() => {
        onValue(ref(database, "posts"), snap => {
            mapPosts = snap.val();
            posts = Object.values(snap.val());
            console.log(post);
        });
    });
</script>

<div class="p-3 rounded bg-light mb-4">
    <h5 class="mb-3 ps-1">Добавить новую публикацию</h5>
    <div class="row">
        <div class="col">
            <input bind:value={post.value.title} class="form-control mb-3" placeholder="Заголовок" />
            <input bind:value={post.value.text} class="form-control mb-3" placeholder="Текст" />
            <input bind:value={post.value.image} class="form-control mb-3" placeholder="Адрес картинки" />
            <button
                class="btn btn-dark"
                on:click={() => {
                    console.log(post.key);
                    if (post.key === "") {
                        const key = push(child(ref(database), "posts")).key;
                        update(ref(database, `posts/${key}`), post.value);
                    } else {
                        update(ref(database, `posts/${post.key}`), post.value);
                    }
                    post = { key: "", value: { title: "", text: "", image: null } };
                }}>Сохранить</button
            >
            <button
                class="btn btn-light"
                on:click={() => {
                    post = { key: "", value: { title: "", text: "", image: null } };
                }}>Отмена</button
            >
        </div>
        <div class="col-2"><img class="img-fluid rounded" src={post.value.image} alt="" /></div>
    </div>
</div>

<div class="row row-cols-1 row-cols-md-4 g-4">
    {#each Object.entries(mapPosts) as [key, item]}
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{item.title}</h5>
                        <button
                            class="btn btn-sm bg-white"
                            on:click={() => {
                                post = { key: key, value: item };
                            }}><i class="fa-solid fa-pen-to-square text-warning" /></button
                        >
                    </div>
                    <p class="card-text">{item.text}</p>
                </div>
                {#if item.image != null}
                    <img src={item.image} class="card-img-bottom" alt="..." />
                {/if}
            </div>
        </div>
    {/each}
</div>
