import  Jwt  from "jsonwebtoken";
import AdminDAO from "../dao/adminDAO.js";
import ContainerDAO from "../dao/containersDAO.js";
import VisionDAO from "../dao/visionsDAO.js";

export default class VerifyToken {
    static async auth(req,res,next) {
      
     const token = req.header('token');
       // const token = req.body.token;
     if(!token){
        return res.status(401).send('Access Denied');
     }
     try{
            const verified = Jwt.verify(token , process.env.SECRET_KEY)
            req.admin = verified
            next()
     }catch(e){
            res.status(400).send('Invalid Token')
     }

       
    }

    static  authRole(role) {
              return (req, res, next) => {
                     if (req.admin.role !== role) {
                       res.status(401)
                       return res.send('Not allowed')
                     }
                 
                     next()
                   }
                 }


        static async authPermission(req, res, next) {
              const token = req.header('token');
              // const token = req.body.token;
               if (!token) {
                  return res.status(401).send('Access Denied');
               }
                   
               try {
                const verified = Jwt.verify(token, process.env.SECRET_KEY);
                req.admin = verified; // Assuming the user information is stored in the 'user' property of the verified token
                   
               // Check if the user is an admin
                      if (req.admin.role === 'admin') {
                      next(); // Admin can access all user information
                     } else {
                     // Check if the requested user ID matches the user in the token
                     const requestparamsId = req.params.id
                     const requestedUser = await AdminDAO.getAdminById(requestparamsId);
                     const requestedUserEmail = requestedUser.email; // Assuming the requested user ID is passed in the URL parameter
                      if (requestedUserEmail === req.admin.email ) {
                        next(); // Regular user can access their own information
                       } else {
                       return res.status(403).send('Forbidden'); // Regular user is not authorized to access other user's information
                      }
                     }
              } catch (e) {
                       res.status(400).send('Invalid Token');
              }
              }

              static async authPermissions(req, res, next) {
                     const token = req.header('token');
                     // const token = req.body.token;
                      if (!token) {
                         return res.status(401).send('Access Denied');
                      }
                          
                      try {
                       const verified = Jwt.verify(token, process.env.SECRET_KEY);
                       req.admin = verified; // Assuming the user information is stored in the 'user' property of the verified token
                          
                      // Check if the user is an admin
                             if (req.admin.role === 'admin') {
                             next(); // Admin can access all user information
                            } else {
                            // Check if the requested user ID matches the user in the token
                            const requestparamsId = req.params.id
                            // Assuming the requested user ID is passed in the URL parameter
                            const requestdContainersEmail = await ContainerDAO.getContainerById(requestparamsId);
                            const reqContainersEmail = requestdContainersEmail.email
                             if (reqContainersEmail === req.admin.email) {
                               next(); // Regular user can access their own information
                              } else {
                              return res.status(403).send('Forbidden'); // Regular user is not authorized to access other user's information
                             }
                            }
                     } catch (e) {
                              res.status(400).send('Invalid Token');
                     }
                     }
              static async authPermissionss(req, res, next) {
                     const token = req.header('token');
                     // const token = req.body.token;
                      if (!token) {
                         return res.status(401).send('Access Denied');
                      }
                          
                      try {
                       const verified = Jwt.verify(token, process.env.SECRET_KEY);
                       req.admin = verified; // Assuming the user information is stored in the 'user' property of the verified token
                          
                      // Check if the user is an admin
                             if (req.admin.role === 'admin') {
                             next(); // Admin can access all user information
                            } else {
                            // Check if the requested user ID matches the user in the token
                            const requestparamsId = req.params.id
                            // Assuming the requested user ID is passed in the URL parameter
                            const requestdVisionEmail = await VisionDAO.getVisionById(requestparamsId);
                            const reqVisionEmail = requestdVisionEmail.email
                             if (reqVisionEmail === req.admin.email) {
                               next(); // Regular user can access their own information
                              } else {
                              return res.status(403).send('Forbidden'); // Regular user is not authorized to access other user's information
                             }
                            }
                     } catch (e) {
                              res.status(400).send('Invalid Token');
                     }
                     }
                     static async authPermissio(req, res, next) {
                            const token = req.header('token');
                            // const token = req.body.token;
                             if (!token) {
                                return res.status(401).send('Access Denied');
                             }
                                 
                             try {
                              const verified = Jwt.verify(token, process.env.SECRET_KEY);
                              req.admin = verified; // Assuming the user information is stored in the 'user' property of the verified token
                                 
                             // Check if the user is an admin
                                    if (req.admin.role === 'admin') {
                                    next(); // Admin can access all user information
                                   } else {
                                   // Check if the requested user ID matches the user in the token
                                   // Assuming the requested user ID is passed in the URL parameter
                                  
                                   const reqVisionEmail = req.body.email
                                    if (reqVisionEmail === req.admin.email) {
                                      next(); // Regular user can access their own information
                                     } else {
                                     return res.status(403).send('Forbidden'); // Regular user is not authorized to access other user's information
                                    }
                                   }
                            } catch (e) {
                                     res.status(400).send('Invalid Token');
                            }
                            }
       


       // static authPermission(req,res,next){
       //        if (req.admin) {
       //               const permission = Permission.canViewContainer;
       //               if (!permission(req.admin)) {
       //                 return res.status(401).send('Not Allowed');
       //               }
       //             }
       //             next()

       // }
       


}

// import  Jwt  from "jsonwebtoken";
// import ROLE from "../dao/role.js"
// import Permission from "./permissions.js";

// export default class VerifyToken {
//     static async auth(req,res,next) {
      
//      const token = req.header('auth-token');
//      if(!token){
//         return res.status(401).send('Access Denied');
//      }
//      try{
//             const verified = Jwt.verify(token , process.env.SECRET_KEY)
//             req.admin = verified.role === ROLE.ADMIN ? verified : null;
//             req.user = verified.role !== ROLE.ADMIN ? verified : null;
       

//             if (!req.admin && !req.user) {
//               return res.status(403).send('Unauthorized access');
//             }

//             if (req.user) {
//               const permission = Permission.canViewContainer;
//               if (!permission(req.user, req.containers)) {
//                 return res.status(401).send('Not Allowed');
//               }
//             }


//             next()
//      }catch(e){
//             res.status(400).send('Invalid Token')
//      }

       
//     }

//     static  authRole(role) {
//        return (req, res, next) => {
//               if (req.user.role !== role) {
//                 res.status(401)
//                 return res.send('Not allowed')
//               }
          
//               next()
//             }
//           }


// }