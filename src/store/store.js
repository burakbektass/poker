import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [
      { id: 1, name: "Kupa Kizi", isOpened: false, img: "src/assets/queen_of_hearts2.png" },
      { id: 2, name: "Maça Kizi", isOpened: false, img: "src/assets/queen_of_spades2.png" },
      { id: 3, name: "Sinek Kizi", isOpened: false, img: "src/assets/queen_of_clubs2.png" },
      { id: 4, name: "Karo Kizi", isOpened: false, img: "src/assets/queen_of_diamonds2.png" },
      { id: 5, name: "Kupa Papazi", isOpened: false, img: "src/assets/king_of_hearts2.png" },
      { id: 6, name: "Maça Papazi", isOpened: false, img: "src/assets/king_of_spades2.png" },
      { id: 7, name: "Sinek Papazi", isOpened: false, img: "src/assets/king_of_clubs2.png" },
      { id: 8, name: "Karo Papazi", isOpened: false, img: "src/assets/king_of_diamonds2.png" },
    ],
    cardNumbers: 4,
    chances: { 4: 1, 6: 2, 8: 3 },
    chance: 1,
    allowedTime: 8,
    winnerCard: { id: 1, name: "Kupa Kizi", isOpened: false, img: "src/assets/kupakizi.png" },
    isTimeAllowed: true,
    isVictory: false,
    isFinished: false,
    listedCards: [
      { id: 1, name: "Kupa Kizi", isOpened: false, img: "src/assets/queen_of_hearts2.png" },
      { id: 2, name: "Maça Kizi", isOpened: false, img: "src/assets/queen_of_spades2.png" },
      { id: 3, name: "Sinek Kizi", isOpened: false, img: "src/assets/queen_of_clubs2.png" },
      { id: 4, name: "Karo Kizi", isOpened: false, img: "src/assets/queen_of_diamonds2.png" },]

  },
  mutations: {
    updateWinnerCard(state, payload) {
      state.winnerCard = payload
    },
    updateCardNumbers(state, payload) {
      state.cardNumbers = payload
      state.chance = state.chances[payload]
      state.listedCards = state.cards.slice(0, payload)
    },
    toggleTime(state, payload) {
      state.isTimeAllowed = payload
    },
    updateChance(state, payload) {
      state.chance += payload
    },
    updateTime(state, payload) {
      state.allowedTime += payload
    },
    updateIsFinished(state, payload) {
      state.isFinished = payload
    },
    updateVictory(state, payload) {
      state.isVictory = payload
    },
    resetTime(state, payload) {
      state.allowedTime = 8
    }


  },
});
