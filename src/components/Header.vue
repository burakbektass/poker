<template>
    <div class="header">
        <p>Kalan Seçim Hakkı: {{ chance }}</p>
        <p>Kazanan Kart: {{ winnerCard }}</p>
        <p v-if="isTimeAllowed">Kalan Süre: {{ countDown }}</p>

    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    computed: {
        winnerCard() {
            return this.$store.state.winnerCard.name
        },
        startCoundown() {
            return this.$store.state.startGame
        },
        isTimeAllowed() {
            return this.$store.state.isTimeAllowed
        },
        chance() {
            return this.$store.state.chance
        },
        allowedTime() {
            return this.$store.state.allowedTime
        },
        countDown() {
            if (this.isTimeAllowed) {
                if (this.allowedTime > 0) {
                    const timer = setTimeout(() => {
                        this.$store.commit("updateTime", -1)
                        if (this.allowedTime === 0) {
                            this.$store.commit("updateChance", -1)
                            if (this.chance > 0) {
                                this.$store.commit("resetTime")
                                clearTimeout(timer)
                                
                            } else {
                                this.$store.commit("updateIsFinished", true)
                                this.$store.commit("updateVictory", false)
                                clearTimeout(timer)
                            }

                        }
                    }, 1000)
                }

            }

            return this.allowedTime
        },
    },
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