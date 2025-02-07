<template>
    <div class="header-container">
        <div class="header">
            <div class="header-item">
                <span class="label">Remaining Chances</span>
                <span class="value">{{ chance }}</span>
            </div>
            <div class="header-item">
                <span class="label">Winning Card</span>
                <span class="value">{{ winnerCard }}</span>
            </div>
            <div class="header-item" v-if="isTimeAllowed">
                <span class="label">Time Left</span>
                <span class="value">{{ allowedTime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null
        }
    },
    computed: {
        winnerCard() {
            return this.$store.state.winnerCard.name
        },
        isTimeAllowed() {
            return this.$store.state.isTimeAllowed
        },
        chance() {
            return this.$store.state.chance
        },
        allowedTime() {
            return this.$store.state.allowedTime
        }
    },
    methods: {
        startTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            
            this.timer = setInterval(() => {
                if (this.allowedTime > 0 && !this.$store.state.isFinished) {
                    this.$store.commit("updateTime", -1);
                    
                    if (this.allowedTime === 0) {
                        this.$store.commit("updateChance", -1);
                        
                        if (this.chance > 0) {
                            this.$store.commit("resetTime");
                        } else {
                            this.$store.commit("updateIsFinished", true);
                            this.$store.commit("updateVictory", false);
                            this.stopTimer();
                        }
                    }
                }
            }, 1000);
        },
        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    },
    watch: {
        'isTimeAllowed'(newVal) {
            if (newVal) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        },
        'isFinished'(newVal) {
            if (newVal) {
                this.stopTimer();
            } else if (this.isTimeAllowed) {
                this.stopTimer();
                this.startTimer();
            }
        },
        'allowedTime'(newVal, oldVal) {
            if (newVal > oldVal && this.isTimeAllowed && !this.$store.state.isFinished) {
                this.stopTimer();
                this.startTimer();
            }
        }
    },
    created() {
        if (this.isTimeAllowed) {
            this.startTimer();
        }
    },
    beforeDestroy() {
        this.stopTimer();
    }
}
</script>

<style>
.header-container {
    padding: 15px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 60%;
    margin: 0 auto;
}

.header {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.header-item {
    background: white;
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 140px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.header-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

.value {
    font-size: 1.2rem;
    color: #2c3e50;
    font-weight: 600;
}

@media (max-width: 768px) {
    .header-container {
        width: 90%;
    }

    .header {
        gap: 15px;
    }

    .header-item {
        min-width: 120px;
        padding: 10px 15px;
    }

    .label {
        font-size: 0.8rem;
    }

    .value {
        font-size: 1.1rem;
    }
}
</style>