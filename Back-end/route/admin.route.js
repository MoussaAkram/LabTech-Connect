import express from "express"
import AdminCtrl from "../controller/admin.controller.js";
import VerifyToken from "../validation/verifyToken.js";


const router = express.Router()

router.route("/get").get(VerifyToken.auth, VerifyToken.authRole('admin') , AdminCtrl.apiGetAdmin)
router.route("/get/:id").get(VerifyToken.auth , VerifyToken.authPermission , AdminCtrl.apiGetAdminById)
router.route("/post").post(VerifyToken.auth, VerifyToken.authRole('admin') , AdminCtrl.apiPostAdmin)
// router.route("/postUser").post(AdminCtrl.apiPostUser)
router.route("/post/login").post(AdminCtrl.apiPostLoginAdmin)
// router.route("/post/loginUser").post(AdminCtrl.apiPostLoginUser)
router.route("/update/:id").put(VerifyToken.auth, VerifyToken.authRole('admin') ,AdminCtrl.apiUpdateAdmin)
router.route("/delete/:id").delete(VerifyToken.auth, VerifyToken.authRole('admin') ,AdminCtrl.apiDeleteAdmin)




export default router