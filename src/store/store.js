import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [
      { id: 1, name: "Queen of Hearts", isOpened: false, img: "/assets/queen_of_hearts2.png" },
      { id: 2, name: "Queen of Spades", isOpened: false, img: "/assets/queen_of_spades2.png" },
      { id: 3, name: "Queen of Clubs", isOpened: false, img: "/assets/queen_of_clubs2.png" },
      { id: 4, name: "Queen of Diamonds", isOpened: false, img: "/assets/queen_of_diamonds2.png" },
      { id: 5, name: "King of Hearts", isOpened: false, img: "/assets/king_of_hearts2.png" },
      { id: 6, name: "King of Spades", isOpened: false, img: "/assets/king_of_spades2.png" },
      { id: 7, name: "King of Clubs", isOpened: false, img: "/assets/king_of_clubs2.png" },
      { id: 8, name: "King of Diamonds", isOpened: false, img: "/assets/king_of_diamonds2.png" },
    ],
    cardNumbers: 4,
    chances: { 4: 1, 6: 2, 8: 3 },
    chance: 1,
    allowedTime: 8,
    winnerCard: { id: 1, name: "Queen of Hearts", isOpened: false, img: "/assets/queen_of_hearts2.png" },
    isTimeAllowed: true,
    isVictory: false,
    isFinished: false,
    listedCards: [
      { id: 1, name: "Queen of Hearts", isOpened: false, img: "/assets/queen_of_hearts2.png" },
      { id: 2, name: "Queen of Spades", isOpened: false, img: "/assets/queen_of_spades2.png" },
      { id: 3, name: "Queen of Clubs", isOpened: false, img: "/assets/queen_of_clubs2.png" },
      { id: 4, name: "Queen of Diamonds", isOpened: false, img: "/assets/queen_of_diamonds2.png" }
    ]

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
