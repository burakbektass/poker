<template>
    <div class="sidebar" :class="{ 'sidebar-collapsed': !collapsed }">
        <div class="sidebar-content" v-if="collapsed">
            <button class="close-btn" @click="toggleSidebar">
                <span class="close-icon">×</span>
            </button>
            <h2 class="sidebar-title">Game Settings</h2>
            
            <div class="settings-group">
                <label class="setting-label">Number of Cards</label>
                <select class="setting-select" v-model="cardNumbers">
                    <option disabled value="">Select Amount</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                </select>
            </div>

            <div class="settings-group">
                <label class="setting-label">Winning Card</label>
                <select class="setting-select" v-model="winnerCard">
                    <option disabled value="">Select Card</option>
                    <option v-for="card in cardOptions" :key="card.id">{{ card.name }}</option>
                </select>
            </div>

            <div class="settings-group checkbox-group">
                <label class="setting-label">
                    <span>Timed Game</span>
                    <div class="toggle-switch">
                        <input type="checkbox" id="checkbox" v-model="checked">
                        <span class="slider"></span>
                    </div>
                </label>
            </div>

            <button class="save-btn" @click="saveInfos">
                <span>Save Settings</span>
            </button>
        </div>

        <button class="toggle-btn" @click="toggleSidebar" :class="{ 'toggle-btn-collapsed': !collapsed }">
            <span class="toggle-icon">⚙️</span>
            <span class="toggle-text" v-if="!collapsed">Settings</span>
        </button>
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
            
            if (!this.cardOptions.some(card => card.name === this.winnerCard)) {
                this.winnerCard = this.cardOptions[0].name
            }
        }
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
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    color: white;
    width: 320px;
    transition: all 0.3s ease;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.sidebar-collapsed {
    width: 0;
}

.sidebar-content {
    padding: 2rem;
    height: 100%;
    overflow-y: auto;
}

.sidebar-title {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
    color: white;
    text-align: center;
    font-weight: 600;
    margin-top: 2rem;
}

.settings-group {
    margin-bottom: 1.5rem;
}

.setting-label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}

.setting-select {
    width: 100%;
    padding: 0.85rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    background-size: 1.2rem;
}

.setting-select:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.setting-select:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.checkbox-group {
    display: flex;
    align-items: center;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin-left: 10px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    transition: .4s;
    border-radius: 24px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #4CAF50;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.save-btn {
    width: 100%;
    padding: 0.85rem;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.save-btn:active {
    transform: translateY(0);
}

.toggle-btn {
    position: fixed;
    right: 320px;
    top: 20px;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    border: none;
    color: white;
    padding: 12px 15px;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.toggle-btn-collapsed {
    right: 0;
}

.toggle-icon {
    font-size: 1.4rem;
}

.toggle-text {
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
}

.close-icon {
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: -4px;
}

@media (max-width: 768px) {
    .sidebar {
        width: 280px;
    }

    .toggle-btn {
        right: 280px;
        padding: 10px 12px;
    }

    .toggle-btn-collapsed {
        right: 0;
    }

    .setting-label {
        font-size: 1rem;
    }

    .setting-select {
        font-size: 1rem;
        padding: 0.75rem;
    }

    .save-btn {
        font-size: 1.1rem;
        padding: 0.75rem;
    }
}
</style>