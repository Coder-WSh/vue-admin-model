import { ElMessageBox } from "element-plus";

interface option {
    tittle?: string
    el: any
    confirm?: Function
    reset?: Function
}
const useDialog = (option: option = {
    tittle: '提示',
    el: () => { },
    confirm: () => { },
    reset: () => { },
}) => {
    ElMessageBox({
        title: option.tittle,
        showCancelButton: true,
        distinguishCancelAndClose: true,
        message: option.el && option.el(),
    }).then(action => {
        option.confirm && option.confirm(action)
    }).catch(action => {
        option.reset && option.reset(action)
    });
};

export default useDialog