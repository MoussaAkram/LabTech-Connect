// import { Admin } from "mongodb";
// import ROLE from "../dao/role.js"

// export default class Permission {
//     static async canViewContainer(admin) {

//         return (req, res, next) => {
//          return admin.role === 'admin' || admin.id === req.params.id
//         };
//     }
// }
    // static async scopedProjects(user, container) {

    //     if (user.role === ROLE.ADMIN) return container
    //     return container.filter(container => container.email === user.email)
      

    // }
    // static async canDeleteProject(user, container) {

    //     return container.userId === user.email

    // }
   // static async canViewContainer(req, res, next) {

    //   const admin = req.admin; // Assuming you have set the admin user object on the request object

    //   if (admin.role === 'admin' || admin.id === req.params.id) {
    //     // User has access, so call the next middleware
    //     next();
    //   } else {
    //     // User doesn't have access, return an error response
    //     res.status(403).json({ error: 'Access denied' });
    //   }
    // }