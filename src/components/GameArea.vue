<template>
    <div>
        <div class="area">
            <Card v-for="(card, index) in mixCards" :card="card" @click.native="selectCard(card, index)" :key="card.id" />
        </div>
        <div class="btn-save" v-show="!isFinished">
            <button @click="startGame">Oyunu Başlat</button>&nbsp;
        </div>
        <div class="result" v-show="isFinished">
            <h2>{{ result }}</h2>
            <button class="result-btn" @click="startGame">Oyunu Başlat</button>
        </div>
    </div>
</template>
<script>
import Card from './Card.vue';
export default {
    components: {
        Card
    },
    data() {
        return {
            cards: this.$store.state.cards,
            mixedCards: [],
            selectedCard: null,
        }
    },
    methods: {
        selectCard(card, index) {
            if (this.selectCard == null)
                this.selectCard = card
            this.mixedCards[index].isOpened = true
            this.$store.commit("updateChance", -1)
            this.$store.commit("resetTime")
            if (card.name === this.winnerCard) {
                setTimeout(() => {
                    this.$store.commit("updateIsFinished", true)
                    this.$store.commit("updateVictory", true)
                    this.mixedCards.forEach(card => card.isOpened = true)
                    // this.mixedCards[index].isOpened = false
                }, 1000)
            } else {
                setTimeout(() => {
                    this.mixedCards[index].isOpened = false
                    if (this.$store.state.chance === 0) {
                        this.$store.commit("updateIsFinished", true)
                        this.$store.commit("updateVictory", false)
                    }
                }, 1000)

            }
            this.selectCard =null
        },
        startGame() {
            this.$store.commit("updateIsFinished", false)
            this.$store.commit("updateCardNumbers", this.cardNumbers)
            this.$store.commit("resetTime")
        }
    },
    computed: {
        mixCards() {
            this.selectedCard = null
            this.mixedCards = [];
            for (let i = 0; i < this.cardNumbers; i++) {
                let newCard = this.listedCards[Math.floor(Math.random() * this.cardNumbers)]
                while (this.mixedCards.includes(newCard)) {
                    newCard = this.listedCards[Math.floor(Math.random() * this.cardNumbers)];
                }
                this.mixedCards.push(newCard)
            }
            return this.mixedCards
        },
        cardNumbers() {
            return this.$store.state.cardNumbers
        },
        listedCards() {
            return this.$store.state.listedCards
        },
        winnerCard() {
            return this.$store.state.winnerCard.name
        },
        allowedTime() {
            return this.$store.state.allowedTime
        },
        isFinished() {
            return this.$store.state.isFinished
        },
        isVictory() {
            return this.$store.state.isVictory
        },
        result() {
            return this.isFinished && this.isVictory ? "Oyuncu Kazandı !!" : this.isFinished && !this.isVictory ? "Banka Kazandı !!" : ""
        }
    },
}
</script>

<style>
.area {
    display: flex;
    margin: 20px 50px 30px 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.result {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #858383;
    opacity: 0.8;
    color: white;
}

.result-btn {
    background-color: rgb(76, 76, 76);
    border-radius: 5px;
    opacity: 1 !important;
}

.btn-save {
    display: flex;
    justify-content: center;
}

.btn-save button {
    border-radius: 9px;
    border: solid 1px #858383
}

.btn-save button:hover {
    background-color: #c7c3c3;
}
</style>