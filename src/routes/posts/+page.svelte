<script>
    // @ts-nocheck
    import { database } from "../../firebase/firebase.js";
    import { ref, child, set, get, push, update, onValue, remove } from "firebase/database";
    import { onMount } from "svelte";
    import { HtmlTag } from "svelte/internal";

    let post = { key: "", value: { title: "", text: "", image: null, tags: [] } };
    let posts = new Map();

    onMount(() => {
        onValue(ref(database, "posts"), snap => {
            posts = snap.val();
            console.log(posts);
        });
    });
</script>

<div class="p-3 rounded bg-light mb-4">
    <h5 class="mb-3 ps-1">Добавить новую публикацию</h5>
    <div class="row">
        <div class="col">
            <input bind:value={post.value.title} class="form-control mb-3" placeholder="Заголовок" />
            <textarea bind:value={post.value.text} class="form-control mb-3" style="min-height: 6.5em;" placeholder="Текст" />
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
                    post = { key: "", value: { title: "", text: "", image: null, tags: [] } };
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

<div class="row row-cols-1 row-cols-md-4 g-4 mb-5">
    {#each Object.entries(posts) as [key, item]}
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title">{item.title}</h5>
                        <div class="d-flex justify-content-end">
                            <button
                                class="btn btn-sm bg-white me-1"
                                on:click={() => {
                                    post = { key: key, value: item };
                                }}><i class="fa-solid fa-pen-to-square text-warning" /></button
                            >
                            <button
                                class="btn btn-sm bg-white"
                                on:click={() => {
                                    remove(ref(database, `posts/${key}`));
                                }}><i class="fa-solid fa-trash text-danger" /></button
                            >
                        </div>
                    </div>
                    <p class="card-text">{@html item.text}</p>
                </div>
                {#if item.image != null}
                    <img src={item.image} class="card-img-bottom" alt="..." />
                {/if}
            </div>
        </div>
    {/each}
</div>
