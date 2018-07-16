<template>
  <div class="container">
    <the-header
      class="mt-5 mb-3"
      :current="quotes.length"
      :max="MAX_QUOTES"
    />
    <quote-add @new-quote="append_new"/>
    <div class="row no-gutters">
      <quote
        v-for="(quote_text, idx) in quotes"
        :key="idx"
        @click.native="remove_self(idx)">
        {{ quote_text }}
      </quote>
    </div>
    <div class="alert alert-info text-center">
      <small>Info: Click on a Quote to delete it.</small>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TheHeader: require('@/components/TheHeader').default,
      Quote: require('@/components/Quote').default,
      QuoteAdd: require('@/components/QuoteAdd').default
    },
    data: () => ({
      MAX_QUOTES: 10,
      quotes: ['Just a Quote to start with something!']
      // quotes: [
      //   'Just',
      //   'a',
      //   'Quote',
      //   'to',
      //   'start',
      //   'with',
      //   'something!',
      //   'winner',
      //   'za',
      //   'kub'
      // ]
    }),
    methods: {
      append_new(quote) {
        this.quotes.length < this.MAX_QUOTES
          ? this.quotes.push(quote)
          : alert('Too many Quotes! Delete some before adding new ones!')
      },
      remove_self(idx) {
        this.quotes.splice(idx, 1)
      }
    }
  }
</script>
