<template>
    <div class="card-container">
        <div class="card"
            :style="{ 
                'background-image': card.isOpened ? 'url(' + card.img + ')' : 'url(' + defaultImg + ')',
                'background-size': card.isOpened ? 'contain' : 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-color': card.isOpened ? 'white' : 'darkgray'
            }">
        </div>
    </div>
</template>

<script>
export default {
    props: ["card"],
    data() {
        return {
            defaultImg: "public/default.jpg"
        }
    },
}
</script>

<style>
.card-container {
    width: 160px;
    height: 230px;
    display: inline-block;
    position: relative;
    perspective: 1000px;
}

.card {
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: solid 1px #b4afaf;
    transition: all 0.3s ease;
    font-size: 25px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card p {
    margin-top: -30px;
}

.card img {
    width: 100px;
    height: 100px;
}
</style>