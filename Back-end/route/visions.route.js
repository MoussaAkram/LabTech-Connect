import express from "express"
import ContainerCtrl from "../controller/vision.controller.js"
import VerifyToken from "../validation/verifyToken.js";

const router = express.Router()

router.route("/get").get(VerifyToken.auth, VerifyToken.authPermissionss,ContainerCtrl.apiGetVisions)
router.route("/:id").get(VerifyToken.auth, VerifyToken.authPermissionss,ContainerCtrl.apiGetVisionsById)
router.route("/post").post(VerifyToken.auth, VerifyToken.authPermissio, ContainerCtrl.apiPostVisions)
router.route("/update/:id").put(VerifyToken.auth, VerifyToken.authPermissionss ,ContainerCtrl.apiUpdateVisions)
router.route("/delete/:id").delete(VerifyToken.auth, VerifyToken.authPermissionss, ContainerCtrl.apiDeleteVisions)


export default router