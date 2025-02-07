<template>
    <div class="game-container">
        <div class="area" :data-cards="cardNumbers">
            <Card v-for="(card, index) in mixCards" 
                  :card="card" 
                  @click.native="handleCardSelect(card, index)" 
                  :key="card.id"
                  class="card-item" />
        </div>
        <div class="controls">
            <button class="control-btn" @click="startGame" v-show="!isFinished">
                <span class="btn-text">Start Game</span>
            </button>
        </div>
        <div class="result" v-show="isFinished">
            <h2 class="result-text">{{ result }}</h2>
            <button class="control-btn result-btn" @click="startGame">
                <span class="btn-text">Start Game</span>
            </button>
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
            selectedCardItem: null,
        }
    },
    methods: {
        handleCardSelect(card, index) {
            if (this.mixedCards[index].isOpened || this.isFinished || this.$store.state.chance <= 0) {
                return;
            }

            if (this.$store.state.chance > 0) {
                if (this.selectedCardItem === null) {
                    this.selectedCardItem = card;
                }
                this.mixedCards[index].isOpened = true;
                this.$store.commit("updateChance", -1);
                this.$store.commit("resetTime");
                
                if (card.name === this.winnerCard) {
                    setTimeout(() => {
                        this.$store.commit("updateIsFinished", true);
                        this.$store.commit("updateVictory", true);
                        this.mixedCards.forEach(card => card.isOpened = true);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.mixedCards[index].isOpened = false;
                        if (this.$store.state.chance === 0) {
                            this.$store.commit("updateIsFinished", true);
                            this.$store.commit("updateVictory", false);
                        }
                    }, 1000);
                }
                this.selectedCardItem = null;
            }
        },
        startGame() {
            this.$store.commit("updateIsFinished", false);
            this.$store.commit("updateCardNumbers", this.cardNumbers);
            this.$store.commit("resetTime");
        }
    },
    computed: {
        mixCards() {
            this.selectedCardItem = null;
            this.mixedCards = [];
            for (let i = 0; i < this.cardNumbers; i++) {
                let newCard = {...this.listedCards[Math.floor(Math.random() * this.cardNumbers)]};
                while (this.mixedCards.some(card => card.name === newCard.name)) {
                    newCard = {...this.listedCards[Math.floor(Math.random() * this.cardNumbers)]};
                }
                newCard.id = `card_${Date.now()}_${i}`;
                newCard.isOpened = false;
                this.mixedCards.push(newCard);
            }
            return this.mixedCards;
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
            return this.isFinished && this.isVictory ? "Player Won!!" : this.isFinished && !this.isVictory ? "Bank Won!!" : ""
        }
    },
}
</script>

<style>
.game-container {
    position: relative;
    padding: 20px;
    min-height: 60vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.area {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 160px); /* 4'lü grid */
    gap: 20px;
    padding: 20px;
    margin: 0 auto;
}

/* 6 kart için */
.area[data-cards="6"] {
    grid-template-columns: repeat(3, 160px); /* 3'lü grid */
}

/* 4 kart için */
.area[data-cards="4"] {
    grid-template-columns: repeat(2, 160px); /* 2'li grid */
}

.card-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.controls {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.control-btn {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}

.control-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
}

.control-btn:active {
    transform: translateY(0);
}

.result {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.result-text {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    animation: slideIn 0.5s ease;
}

.result-btn {
    background: linear-gradient(135deg, #34d399 0%, #059669 100%);
    animation: bounceIn 0.5s ease 0.3s both;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes bounceIn {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Mobil responsive */
@media (max-width: 768px) {
    .area {
        grid-template-columns: repeat(2, 140px);
        gap: 15px;
        padding: 15px;
    }

    /* Mobilde 6 kart için */
    .area[data-cards="6"] {
        grid-template-columns: repeat(2, 140px);
    }

    /* Mobilde 4 kart için */
    .area[data-cards="4"] {
        grid-template-columns: repeat(2, 140px);
    }

    .result-text {
        font-size: 2rem;
    }

    .control-btn {
        padding: 10px 25px;
        font-size: 1rem;
    }
}

/* Çok küçük ekranlar için */
@media (max-width: 360px) {
    .area {
        grid-template-columns: repeat(1, 140px);
    }

    .area[data-cards="6"],
    .area[data-cards="4"] {
        grid-template-columns: repeat(1, 140px);
    }
}
</style>