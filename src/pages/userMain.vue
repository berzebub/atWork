<template>
  <q-page>
    <div class="container">
      <div align="center">
        <q-btn style="width:190px" color="blue-grey-10" label="เพิ่ม" @click="addUser()"></q-btn>
      </div>
      <div>
        <q-card class="rounded-borders q-py-md q-mt-lg br">
          <q-card-section class="no-padding">
            <q-btn class="q-mb-md q-ml-md" dense color="blue-grey-10" round label="A"></q-btn>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="row q-px-md">
              <div class="col-11">
                <div>Annabelle Smith</div>
                <div>acornversion@gmail.com</div>
                <div>
                  <q-badge label="แบบฝึกหัด" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>

                  <q-badge label="กิจการ" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                  <q-badge label="พนักงาน" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                </div>
              </div>
              <div class="col" align="right">
                <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu :offset="[-15, 0]" self="top right">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section>แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-separator class="q-my-md" />
          <q-card-section class="no-padding">
            <div class="row q-px-md">
              <div class="col-11">
                <div>Apple Kim</div>
                <div>adison.eduinn@gmail.com</div>
                <div>
                  <q-badge label="แบบฝึกหัด" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>

                  <q-badge label="พนักงาน" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                </div>
              </div>
              <div class="col" align="right">
                <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu :offset="[-15, 0]" self="top right">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section>แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- crad2 -->
        <q-card class="rounded-borders q-py-md q-mt-lg br">
          <q-card-section class="no-padding">
            <q-btn class="q-mb-md q-ml-md" dense color="blue-grey-10" round label="P"></q-btn>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="row q-px-md">
              <div class="col-11">
                <div>Pajaree Kittisupaluck</div>
                <div>pajaree.eduinn@gmail.com</div>
                <div>
                  <q-badge label="แบบฝึกหัด" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>

                  <q-badge label="กิจการ" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                  <q-badge label="พนักงาน" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                </div>
              </div>
              <div class="col" align="right">
                <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu :offset="[-15, 0]" self="top right">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section>แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-separator class="q-my-md" />
          <q-card-section class="no-padding">
            <div class="row q-px-md">
              <div class="col-11">
                <div>Plung Ekkachai</div>
                <div>pn_eduinn@gmail.com</div>
                <div>
                  <q-badge label="แบบฝึกหัด" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>

                  <q-badge
                    label="ระดับการเรียน"
                    color="blue-grey-10"
                    outline
                    class="q-mr-sm q-mt-sm"
                  ></q-badge>
                  <q-badge label="กิจการ" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>

                  <q-badge label="พนักงาน" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                  <q-badge label="ผู้ดูแลระบบ" color="blue-grey-10" outline class="q-mr-sm q-mt-sm"></q-badge>
                </div>
              </div>
              <div class="col" align="right">
                <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu :offset="[-15, 0]" self="top right">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section>แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addUser() {
      this.$router.push("userAddEdit");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>