<template>
  <q-page class="text-blue-grey-10">
    <!-- practiceList -->
    <!-- show content -->
    <div class="q-pt-md brx" style="width: 360px">
      <q-list class="rounded-borders">
        <q-expansion-item v-model="expanded" label="อาหาร">
          <q-card class="q-px-md q-pb-sm">
            <div class="row q-pb-sm">
              <div class="col">1. จองโต๊ะ</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">2. สั่งอาหาร</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">3. สั่งเครื่องดื่ม</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="expanded" label="อาหาร">
          <q-card class="q-px-md q-pb-sm">
            <div class="row q-pb-sm">
              <div class="col">1. จองโต๊ะ</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">2. สั่งอาหาร</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">3. สั่งเครื่องดื่ม</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
          </q-card>
        </q-expansion-item>
        <q-separator />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      expanded: ""
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>