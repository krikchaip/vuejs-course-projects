const randInt = max => Math.floor(Math.random() * max) + 1;

new Vue({
  el: '#app',
  data: () => ({
    isStarted: false,
    player: { hp: 100 },
    monster: { hp: 100 },
    logs: []
  }),
  computed: {
    buttons() {
      return [
        { name: 'attack', text: 'attack', action: this.attack.bind(this) },
        { name: 'spec', text: 'special attack', action: this.spec.bind(this) },
        { name: 'heal', text: 'heal', action: this.heal.bind(this) },
        { name: 'giveup', text: 'giveup', action: this.giveup.bind(this) }
      ]
    }
  },
  methods: {
    startGame() {
      this.isStarted = true
      this.player.hp = 100
      this.monster.hp = 100
      this.logs = []
    },
    checkGameState() {
      if(this.player.hp <= 0 || this.monster.hp <= 0) {
        let newGame = confirm(
          this.player.hp <= 0 ? 'You lost! New Game?'
          : this.monster.hp <= 0 ? 'You win! New Game?'
          : 'You lost! New Game?'
        )
        if(newGame) {
          this.startGame()
        } else {
          this.isStarted = false
        }
      }
    },
    attack() {
      let playerHitAmount = randInt(10)
      let monsterHitAmount = randInt(10)
      this.player.hp -= monsterHitAmount
      this.monster.hp -= playerHitAmount
      this.logs.push({
        class: 'logs-message-monster',
        msg: `monster hits player for ${monsterHitAmount}`
      })
      this.logs.push({
        class: 'logs-message-player',
        msg: `player hits monster for ${playerHitAmount}`
      })
      this.checkGameState()
    },
    spec() {
      let playerHitAmount = randInt(20)
      let monsterHitAmount = randInt(10)
      this.player.hp -= monsterHitAmount
      this.monster.hp -= playerHitAmount
      this.logs.push({
        class: 'logs-message-monster',
        msg: `monster hits player for ${monsterHitAmount}`
      })
      this.logs.push({
        class: 'logs-message-player',
        msg: `player hits monster for ${playerHitAmount}`
      })
      this.checkGameState()
    },
    heal() {
      let monsterHitAmount = randInt(20)
      this.player.hp -= monsterHitAmount
      this.player.hp + 10 > 100
        ? this.player.hp = 100
        : this.player.hp += 10
      this.logs.push({
        class: 'logs-message-monster',
        msg: `monster hits player for ${monsterHitAmount}`
      })
      this.logs.push({
        class: 'logs-message-player',
        msg: `player heals himself for 10`
      })
      this.checkGameState()
    },
    giveup() {
      this.isStarted = false
    }
  }
})
