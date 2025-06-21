<template>
  <div class="upload-container">
    <el-upload
      class="upload-demo"
      drag
      v-model:file-list="fileList"
      action=""
      :auto-upload="true"
      :http-request="handleUpload"
      :before-upload="handleBeforeUpload"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import type {
  UploadFiles,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";
// 取代原来的默认上传方法
const handleUpload = (_: UploadRequestOptions) => {
  // console.log('options',options)
  // console.log('upload')
  return Promise.resolve();
};
//rawFile是上传的文件,也就是file格式要转blob格式 ，在filelist中的元素的raw
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  const fileBlob = new Blob([rawFile], {
    type: rawFile.type,
  });
  console.log("rawFile", rawFile,fileBlob);
  if (fileList.value[0] && fileList.value[0]?.raw) {
    // console.log("122", fileList.value);
    // console.log("122", Object.prototype.toString.call(fileList.value[0]?.raw));
  }
  return true;
};

const fileList = ref<UploadFiles>([]);

// const submit = () => {
//   console.log("submit");
//   const formData = new FormData();
//   // formData.append("file",null);
// };
</script>

<style scoped lang="less">
.upload-container {
}
</style>
