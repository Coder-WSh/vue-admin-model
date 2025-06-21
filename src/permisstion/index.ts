import { ElMessage, ElMessageBox } from "element-plus";
import router from "../route";

/**
 * @description 是否登录
 */
const isAuthenied = () => {
  return false;
};

const alterBox = () => {
  ElMessageBox.confirm("登录过期，请重新登录")
    .then(() => {
      ElMessage({
        type: "success",
        message: "跳转成功",
      });
    })
    .catch((err) => {
      console.log("routerIntercepeter", err);
      ElMessage({
        type: "info",
        message: "跳转失败",
      });
    });
};

router.beforeEach(async (to, _) => {
  if (to.name !== "login" && !isAuthenied()) {
    alterBox();
  }
});
