<template>
    <div class="sidebar">
        <h1>
            <div class="bar" v-if="collapsed">
                <div class="bar-el">
                    Kart Sayisi: &nbsp;&nbsp;&nbsp;
                    <select class="select" v-model="cardNumbers">
                        <option disabled value="">Adet Seçin</option>
                        <option>4</option>
                        <option>6</option>
                        <option>8</option>
                    </select>
                </div>
                <br>
                <div class="bar-el">
                    Kazanan Kart:
                    <select class="select" v-model="winnerCard">
                        <option disabled value="">Kart Seçin</option>
                        <option v-for="card in cardOptions" :key="card.id">{{ card.name }}</option>
                    </select>
                </div>
                <br>
                <div class="bar-el-time">
                    Süreli Oyun:
                    <input type="checkbox" id="checkbox" v-model="checked">
                </div>
                <br>
                <button class="bar-el-btn" @click="saveInfos">Kaydet</button>

            </div>
        </h1>

        <span class="collapse-icon" @click="toggleSidebar">
            <p>Ayarlar</p>
        </span>

    </div>
</template>
<script>
export default {
    data() {
        return {
            collapsed: false,
            cardNumbers: this.$store.state.cardNumbers,
            winnerCard: this.$store.state.winnerCard.name,
            checked: this.$store.state.isTimeAllowed,
            cards: this.$store.state.cards,
            cardOptions: this.$store.state.listedCards
        }
    },
    methods: {
        toggleSidebar() {
            this.collapsed = !this.collapsed
        },
        saveInfos() {
            this.$store.commit("updateCardNumbers", this.cardNumbers)
            let winner = this.$store.state.listedCards.find(card => card.name === this.winnerCard)
            this.$store.commit("updateWinnerCard", winner)
            this.$store.commit("toggleTime", this.checked)
            this.toggleSidebar()

        }
    },
    watch: {

        cardNumbers() {
            this.cardOptions = this.cards.slice(0, this.cardNumbers)
            
        },
    },
    computed: {
        listedCards() {
            return this.$store.state.listedCards
        }
    }
}
</script>

<style scoped>
.sidebar {
    color: white;
    background-color: #7b7874;
    float: right;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    transition: 0.3s ease;
    padding: 4em 1em 1em 1em;
    min-width: 80px;
    display: flex;
    flex-direction: column;
}

.select {
    color: black;
    font-size: 13px;
    text-align: center;
    width: 90px;
}

.sidebar h1 {
    height: 2.5em;
    font-size: 15px;
}


.bar-el-time input {
    margin-left: 15px;
}

.bar-el-btn {
    color: black;
    border-radius: 7px;
    border: solid 1px #7b7874
}

.bar-el-btn:hover {
    background-color: #b1b0ae;
}

.collapse-icon {
    position: absolute;
    top: 10px;
    padding: 3px 5px 0px 5px;
    cursor: pointer;
    border: solid 1px #c9bebe;
    color: white;
    border-radius: 5px;
    transition: 0.2s linear;
}

.collapse-icon:hover {
    background-color: rgb(158, 146, 146);
    transition: box-shadow .5s;
}
</style>