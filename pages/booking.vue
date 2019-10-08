<template>
  <v-layout>
    <v-flex md4>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'one-way',
      tabs: [
        { name: 'One way', key: 'one-way' },
        { name: 'Return trip', key: 'return-trip' }
      ]
    }
  }
}
</script>
