<template>
    <div>
        <div class="card"
            :style="{ 'background-image': card.isOpened ? 'url(' + card.img + ')' : 'url(' + defaultImg + ')' }">
            <p>{{ card.name }}</p>
        </div>

    </div>
</template>
<script>
export default {
    props: ["card"],
    data() {
        return {
            defaultImg: "src/assets/default.jpg"
        }
    },
}
</script>
<style>
.card {
    text-align: center;
    width: 160px;
    height: 230px;
    border-radius: 10px;
    margin: 5px;
    background: darkgray;
    background-image: url("../assets/default.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    border: solid 1px #b4afaf;
    transition: box-shadow .5s;
    font-size: 25px;
    cursor: pointer;
}

.card p {
    margin-top: -30px;
}

.card img {
    width: 100px;
    height: 100px;
}

.card:hover {
    box-shadow: 0px 5px 45px #666;
    transition: box-shadow .5s;
}
</style>