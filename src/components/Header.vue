<template>
    <div class="header">
        <p>Remaining Chances: {{ chance }}</p>
        <p>Winning Card: {{ winnerCard }}</p>
        <p v-if="isTimeAllowed">Time Left: {{ allowedTime }}</p>
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
.header {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 55px;
    column-gap: 50px;
}

.header p {
    border: solid 1px #575757;
    padding: 6px;
    border-radius: 5px;
}
</style>