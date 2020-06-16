<template>
  <q-page>
    <div>
      <div class="text-center text-h6 q-pb-sm">Multiple Choice | U7</div>
      <div class="q-py-sm">
        <span>รหัสลำดับ</span>
        <div>
          <q-input outlined v-model="number" dense />
        </div>
      </div>
      <div class="q-py-sm">
        <span>คำถาม</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="editor"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="row q-py-sm" style="width:360px">
        <div class="col-6">
          <q-checkbox style="margin:-10px" val="teal" label="เสียง" color="black" />
        </div>
        <div class="col-6">
          <q-checkbox style="margin: -10px;" val="teal" label="รูปภาพ" color="black" />
        </div>
      </div>
      <div class="q-py-sm">
        <span>รูปภาพตัวเลือก</span>
        <div class="row q-py-sm" style="width:360px">
          <div class="col-6">
            <q-radio style="margin:-10px" val="line" label="Line" />
          </div>
          <div class="col-6">
            <q-radio style="margin: -10px;" val="rectangle" label="Rectangle" />
          </div>
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #1</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="editor"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #2</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="editor"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #3</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="editor"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #4</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="editor"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>รูปภาพตัวเลือก</span>
        <div class="row q-py-sm">
          <div class="col-xs-6 col-md-3 q-py-sm">
            <q-radio style="margin:-10px" val="line" label="Line" />
          </div>
          <div class="col-xs-6 col-md-3 q-py-sm">
            <q-radio style="margin: -10px;" val="rectangle" label="Rectangle" />
          </div>
          <div class="col-xs-6 col-md-3 q-py-md">
            <q-radio style="margin:-10px" val="line" label="Line" />
          </div>
          <div class="col-xs-6 col-md-3 q-py-md">
            <q-radio style="margin: -10px;" val="rectangle" label="Rectangle" />
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="q-px-md">
          <q-btn dense style="width:150px" color="white" outline text-color="black" label="ยกเลิก" />
        </div>
        <div class="q-px-md">
          <q-btn dense style="width:150px" color="black" label="บันทึก" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      number: "",
      editor: ""
    };
  }
};
</script>
<style  scoped>
</style>