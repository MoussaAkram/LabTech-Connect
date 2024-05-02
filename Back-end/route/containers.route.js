import express from "express"
import ContainerCtrl from "../controller/containers.controller.js"
import VerifyToken from "../validation/verifyToken.js";

const router = express.Router()
// VerifyToken.auth, VerifyToken.authRole('admin'), 
router.route("/get").get(VerifyToken.auth , VerifyToken.authRole('admin') , ContainerCtrl.apiGetContainers)
// VerifyToken.auth, VerifyToken.authPermission,
router.route("/id/:id").get(VerifyToken.auth, VerifyToken.authPermissions ,ContainerCtrl.apiGetContainersById)
router.route("/post").post(VerifyToken.auth , VerifyToken.authRole('admin') ,ContainerCtrl.apiPostContainers)
router.route("/update/id/:id").put(VerifyToken.auth, VerifyToken.authPermissions ,ContainerCtrl.apiUpdateContainers)
router.route("/delete/id/:id").delete(VerifyToken.auth , VerifyToken.authRole('admin') ,ContainerCtrl.apiDeleteContainers)


export default router