<template>
  <div class="login">
    <div class="login-panel">
      <Form :formConfig="pnpmloginForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ElMessage } from "element-plus";

import type { ComponentSize } from "element-plus";

import { login } from "@/api/auth.ts";
import { useInfosStore } from "@/store/userInfos/Infos";
import { FormConfig, FormItemType } from "@/components/Form/types";
import { Form } from "@/components/Form/index.ts";

const route = useRouter();

const rules = {
  account: [
    { required: true, message: "请输入账户名称" },
    { min: 6, message: "长度至少 6 位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: "密码必须以大写字母开头，包含大小写字母和数字，长度至少 8 位",
      trigger: "blur",
    },
  ],
};
// const formRef = ref<FormInstance>();

const infos = useInfosStore();

const pnpmloginForm: FormConfig = {
  innerConfig: [
    {
      componentType: FormItemType.Input,
      label: "账户",
      prop: "account",
      placeholder: "请输入账户名称",
    },
    {
      componentType: FormItemType.Input,
      label: "密码",
      prop: "password",
      type: "password",
      placeholder: "请输入密码",
    },
    {
      componentType: FormItemType.Button,
      prop: "button",
      defaultContent: "登录",
      size: "medium" as ComponentSize,
      type: "primary",
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
      },
      events: {
        click: (data, el) => {
          el.validate((valid: boolean) => {
            if (valid) {
              // login(data)
              //   .then((res: any) => {
              // const token = res.token ;
              const token = "1234567890abcdef";
              infos.setToken(token);

              route.push("/main");
              //   })
              //   .catch((err) => {
              //     ElMessage.warning(err?.message);
              //   });
            }
          });
        },
      },
    },
  ],
  rules,
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
  .login-warpper {
    width: 100%;
    .tittle-warpper {
      display: flex;
      width: 100%;
      .account {
        // width: 50%;
        flex: 1;
        height: 50%;
        // background: red;
        // background-image: radial-gradient(circle, #ff0000, #ff0000 50%, transparent 50%);
        background-color: #f0f0f0;
        clip-path: path("M 0 0 L 100 0 L 100 100 L 0 100 L 0 0");
      }
      .phone {
        // width: 50%;
        flex: 1;
        height: 50%;
        // background: blue;
      }
      .active {
      }
    }
  }
}
</style>
