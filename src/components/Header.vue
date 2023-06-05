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
            if (this.allowedTime > 0 && this.isTimeAllowed) {
                setTimeout(() => {
                    this.$store.commit("updateTime", -1)
                    if (this.allowedTime === 0 && this.chance > 0) {
                        this.$store.commit("updateChance", -1)
                        this.$store.commit("resetTime")
                    }
                }, 1000)

            } else if (this.allowedTime === 0 && this.chance === 0) {
                this.$store.commit("updateIsFinished", true)
                this.$store.commit("updateVictory", false)
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