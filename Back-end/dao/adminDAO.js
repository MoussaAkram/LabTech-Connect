import mongodb from "mongodb"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import  ROLE  from "./role.js"

const ObjectId = mongodb.ObjectId

let admins
let users




export default class AdminDAO {
    static async injectDB(conn) {
        if (admins) {
            return
        }
        try {
            admins = await conn.db(process.env.CONTAINERS_NS).collection("admins")
            console.log("admin collection initialized");
        } catch (e) {
            console.error(`Unable to establish collection handles in adminDAO: ${e}`)
        }
    }

    static async getAdmin(){
        try {
            return await admins.find().toArray()
        } catch (e) {
            console.error(`Unable to get admins, ${e}`)
            return { error: e }
        }

    }
    static async getAdminById(adminId){
        try {
            if (!ObjectId.isValid(adminId)) {
                throw new Error('Invalid adminId format');
              }
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(adminId),
                    },
                },
                {
                    $lookup: {
                        from: "containers",
                        let: {
                            email: "$email",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$email", "$$email"], 
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "containers",
                    },
                },
                {
                    $addFields: {
                        containers: "$containers",
                    },
                },
            ];
            
            return await admins.aggregate(pipeline).next();
        } catch (e) {
            console.error(`Unable to get admin by id, ${e}`)
            return { error: e }
        }

    }

    static async addAdmin(name, email, password,role) {
        try {
            
            const emailExist = await admins.findOne({email : email})
            if(emailExist !== null) {
                    throw new Error(` Email already exists : ${emailExist.message}`);
                }

            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password , salt)
           
            const adminDoc = {
                name: name,
                email : email,
                password: hashpassword,
                role: role
                }
                if (role !== "admin" && role !== "basic") {
                    throw new Error(`Invalid role: ${role}`);
                }

            return await admins.insertOne(adminDoc)
        } catch (e) {
            console.error(`Unable to post: ${e}`)
            return { error: e }
        }
    }
    // static async addUser(name, email, password) {
    //     try {
            
    //         const emailExist = await admins.findOne({email : email})
    //         if(emailExist !== null) {
    //                 throw new Error(` Email already exists : ${emailExist.message}`);
    //             }

    //         const salt = await bcrypt.genSalt(10);
    //         const hashpassword = await bcrypt.hash(password , salt)

    //         const adminDoc = {
    //             name: name,
    //             email : email,
    //             password: hashpassword,
    //             role: ROLE.USER
    //             }

    //         return await admins.insertOne(adminDoc)
    //     } catch (e) {
    //         console.error(`Unable to post: ${e}`)
    //         return { error: e }
    //     }
    // }
    static async loginAdmin(email, password) {
        try {
          const admin = await admins.findOne({ email: email });
          if (admin === null) {
            throw new Error(`Email does not exist.`);
          }
      
          const isPasswordValid = await bcrypt.compare(password, admin.password);
          if (!isPasswordValid) {
            throw new Error(`Invalid password.`);
          }

          let role;
             if (admin.role === "admin") {
                role = "admin";
             } else {
                role = "basic";
             }

          const token = jwt.sign({ email: admin.email , role: role , _id: admin._id}, process.env.SECRET_KEY)
      
          // Successful login logic goes here
          // You can return the admin object or perform any necessary operations
      
          return { admin, token };
        } catch (e) {
          console.error(`Unable to login: ${e}`);
          return { error: e };
        }
      }

    //   static async loginUser(email, password) {
    //     try {
    //       const user = await admins.findOne({ email: email });
    //       if (user === null) {
    //         throw new Error(`Email does not exist.`);
    //       }
      
    //       const isPasswordValid = await bcrypt.compare(password, user.password);
    //       if (!isPasswordValid) {
    //         throw new Error(`Invalid password.`);
    //       }
      
    //       const token = jwt.sign({ email: user.email, role: ROLE.USER }, process.env.SECRET_KEY);
      
    //       return { user, token };
    //     } catch (e) {
    //       console.error(`Unable to login: ${e}`);
    //       return { error: e };
    //     }
    //   }


    static async updateAdmin(adminId, name, email, password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password , salt)
            return await admins.updateOne(
                {_id: new ObjectId(adminId), email: email},
                {$set: { name: name, password: hashpassword}},
            )
        } catch (e) {
            console.error(`Unable to update admin: ${e}`)
            return { error: e }
        }
    }

    static async deleteAdmin(adminId) {

        try {
            return await admins.deleteOne({
                _id: new ObjectId(adminId)
            })
        } catch (e) {
            console.error(`Unable to delete admin: ${e}`)
            return { error: e }
        }
    }

}
