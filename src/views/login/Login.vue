<template>
  <div class="login">
    <div class="login-panel">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-width="auto"
      >
        <ElRow>
          <ElCol :span="24">
            <el-form-item label="账户" prop="name">
              <ElInput v-model="formData.name" placeholder="请输入用户名" />
            </el-form-item>
          </ElCol>
          <ElCol :span="24">
            <el-form-item label="密码" prop="password">
              <ElInput
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
                show-password
              >
              </ElInput>
            </el-form-item>
          </ElCol>
        </ElRow>

        <ElRow justify="end">
          <ElButton @click="handleSubmit" type="primary"> 登录 </ElButton>
          <ElButton @click="handleCancel"> 取消 </ElButton>
        </ElRow>
        <ElRow justify="end">
          <ElButton size="small" link @click="handleVisible">
            还未有账号,注册
          </ElButton>
        </ElRow>
      </el-form>
    </div>
    <Dialog :visible="visible" @close="handleClose" :isShowBtn="false">
      <Form
        ref="dialogForm"
        :formList="dialogFormData"
        :formValue="formValue"
        :rules="dialogFormRules"
        @successs="handleDialogForm"
        @close="handleClose"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

import type { ComponentSize, FormInstance, FormRules } from "element-plus";

import { register, login } from "@/api/login.ts";
import { useInfosStore } from "@/store/userInfos/Infos";

const route = useRouter();

const formData = ref({
  account: "",
  password: "",
});
const rules = {
  account: [{ require: true, message: "请输入账户名称" }],
  password: [
    { require: true, message: "请输入密码" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: "密码必须以大写字母开头，包含大小写字母和数字，长度至少 8 位",
      trigger: "blur",
    },
  ],
};
const formRef = ref<FormInstance>();

const infos = useInfosStore();
const handleSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // 发请求，写后端接口
      login(formData.value)
        .then((res) => {
          infos.setToken(res.data);
          route.push("/");
        })
        .catch((err) => {
          ElMessage({
            message: err,
            type: "warning",
          });
        });
    }
  });
};
const handleCancel = () => {
  formRef.value && formRef.value.resetFields();
};

// dialog逻辑
const visible = ref(false);
const dialogForm = ref<FormInstance>();
const dialogFormData = [
  { type: "input", label: "账户", prop: "username", span: 24 },
  {
    type: "input",
    label: "密码",
    prop: "password",
    span: 24,
    innerType: "password",
  },
  { type: "input", label: "邮箱", prop: "email", span: 24 },
  { type: "input", label: "手机号", prop: "mobile", span: 24 },
  {
    type: "datetime",
    label: "出生日期",
    prop: "birthday",
    span: 24,
    innerType: "date",
    format: "YYYY/MM/DD",
  },
  {
    type: "select",
    label: "性别",
    prop: "sex",
    span: 24,
    innerType: "",
    options: [
      { label: "男", value: 0 },
      { label: "女", value: 1 },
    ],
  },
];

const formValue = ref({
  username: "",
  password: "",
  email: "",
  mobile: "",
  birthday: "",
  sex: 0,
});

const dialogFormRules: FormRules = {
  account: [
    {
      required: true,
      message: "请输入账户",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: "密码必须以大写字母开头，包含大小写字母和数字，长度至少 8 位",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确手机号",
      trigger: "blur",
    },
  ],
};
// 打开dialog
const handleVisible = () => {
  visible.value = true;
};
// 关闭dialog
const handleClose = () => {
  dialogForm.value?.clearForm();
  visible.value = false;
};
//dialog form提交
const handleDialogForm = () => {
  register({
    ...formValue.value,
    roleIds: [1],
  }).then((res) => {
    dialogForm.value?.clearForm();
    visible.value = false;
  });
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-image: url("@/assets/images/pexels-photo-26653521.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  .login-panel {
    padding: 18px;

    width: 300px;
    // height: 100%;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 10px;
    background: rgba(248, 246, 246, 0.7);
    box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, 0.08),
      0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);
  }
}
</style>
