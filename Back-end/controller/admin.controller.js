import AdminDAO from "../dao/adminDAO.js";
// import Joi from "@hapi/joi";
import AdminValidation from "../validation/validation.js"
import ROLE from "../dao/role.js";


// const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().min(6).email().required(),
//     password: Joi.string().min(6).required()
// });

export default class AdminController {


    static async apiGetAdmin(req, res, next) {
        try {
            const admins = await AdminDAO.getAdmin();
            res.json(admins);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetAdminById(req, res, next) {
        try {
            const adminId = req.params.id;
            
            
            const admin = await AdminDAO.getAdminById(adminId);
            if (!admin) {
                res.status(404).json({ error: "Admin not found" });
            }
            
            res.json(admin);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiPostAdmin(req, res, next) {
        try {
            const { error } = await AdminValidation.registerValidation(req.body);
            if (error) {
                throw new Error(`Invalid request data: ${error.message}`);
            }

            const name =  req.body.name
            const email =  req.body.email
            const password = req.body.password
            const role = req.body.role

            const AdminResponse = await AdminDAO.addAdmin(
                name,
                email,
                password,
                role,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }



    static async apiPostLoginAdmin(req, res, next) {
        try {
          const { error } = await AdminValidation.loginValidation(req.body);
          if (error) {
            throw new Error(`Invalid request data: ${error.message}`);
          }
      
          const email = req.body.email;
          const password = req.body.password;
      
          const AdminResponse = await AdminDAO.loginAdmin(email, password);
         
          res.header('token', AdminResponse.token).json({ status: "success" , token: AdminResponse.token , role: AdminResponse.admin.role, _id: AdminResponse.admin._id });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      }


    //   static async apiPostUser(req, res, next) {
    //     try {
    //         const { error } = await AdminValidation.registerValidation(req.body);
    //         if (error) {
    //             throw new Error(`Invalid request data: ${error.message}`);
    //         }

    //         const name =  req.body.name
    //         const email =  req.body.email
    //         const password = req.body.password

    //         const AdminResponse = await AdminDAO.addUser(
    //             name,
    //             email,
    //             password,
    //         )
    //         res.json({ status: "success" })
    //     } catch (e) {
    //         res.status(500).json({ error: e.message })
    //     }
    // }


    //   static async apiPostLoginUser(req, res, next) {
    //     try {
    //       const { error } = await AdminValidation.loginValidation(req.body);
    //       if (error) {
    //         throw new Error(`Invalid request data: ${error.message}`);
    //       }
      
    //       const email = req.body.email;
    //       const password = req.body.password;
      
    //       const userResponse = await AdminDAO.loginUser(email, password);
      
    //       res.header('auth-token', userResponse.token).json({ status: 'success', token: userResponse.token, role: ROLE.USER });
    //     } catch (e) {
    //       res.status(500).json({ error: e.message });
    //     }
    //   }





    static async apiUpdateAdmin(req, res, next) {
        try {
            const { errors } = await AdminValidation.updateValidation(req.body);
            if (errors) {
                throw new Error(`Invalid request data: ${errors.message}`);
            }
            const adminId = req.params.id
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password

            const adminResponse = await AdminDAO.updateAdmin(
                adminId,
                name,
                email,
                password,
            )

            var { error } = adminResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (adminResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update admin - admin may not exist",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteAdmin(req, res, next) {
        try {
            const adminId = req.params.id;
            console.log(adminId)
            const adminResponse = await AdminDAO.deleteAdmin(adminId)
            if (adminResponse.deletedCount === 0) {
                throw new Error("Unable to delete admin - admin may not exist.");
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}