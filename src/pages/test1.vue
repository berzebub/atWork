<template>
  <div>
    <!-- <div class="brx q-pa-md" @click="testClick(index)" v-for="(item,index)  in test">
      <q-btn label="a" @click.stop="testClick1()"></q-btn>
      <div v-show="indexClick==index" v-for="item1 in test1">{{item1}}</div>
    </div>-->
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Account settings"
      caption="John Doe"
    ></q-expansion-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: [1, 2, 3],
      test1: [5, 6, 7],
      indexClick: 0
    };
  },
  methods: {
    testClick(index) {
      this.indexClick = index;
    },
    testClick1() {
      console.log("123");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>