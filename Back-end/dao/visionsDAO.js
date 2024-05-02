import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

let visions

export default class VisionDAO {
    static async injectDB(conn) {
        if (visions) {
            return
        }
        try {
            visions = await conn.db(process.env.CONTAINERS_NS).collection("visions")
            console.log("visions collection initialized");
        } catch (e) {
            console.error(`Unable to establish collection handles in visionsDAO: ${e}`)
        }
    }

    static async getVision(){
        try {
        
            return await visions.find().toArray()
         
        } catch (e) {
            console.error(`Unable to get visions, ${e}`)
            return { error: e }
        }

    }
    static async getVisionById(visionsId){
        try {
            
            return await visions.findOne({_id: new ObjectId(visionsId)})
           
        } catch (e) {
            console.error(`Unable to get visions by id, ${e}`)
            return { error: e }
        }

    }

    static async addVision( containersId, email, item, titre, contenants, fileImage,fileVideo) {
        try {
            
            const visionDoc = {
                containersId: new ObjectId(containersId),
                email: email,
                item: item,
                titre: titre,
                contenants : contenants,
                // file : file
                
            };
            if (fileImage) {
                visionDoc.fileImage = fileImage;
              }
              if(fileVideo){
                visionDoc.fileVideo = fileVideo;
              }
              console.log('containersId:', containersId)
              console.log('item:', item)
              console.log('titre:', titre)
              console.log('contenants:', contenants)
              console.log('file:', fileImage)
              console.log('email:', email)

            return await visions.insertOne(visionDoc)
        } catch (e) {
            console.error(`Unable to post: ${e}`)
            return { error: e }
        }
    }

    static async updateVisions(visionId, item, titre, contenants,fileImage,fileVideo) {
        try {
            let updateFields = { item: item, titre: titre, contenants: contenants};
            if (fileImage) {
                updateFields.fileImage = fileImage;
            }
            if (fileVideo) {
                updateFields.fileVideo = fileVideo;
            }
            return await visions.updateOne(
                { _id: new ObjectId(visionId) },
                { $set: updateFields }
            );
        } catch (e) {
            console.error(`Unable to update visions: ${e}`)
            return { error: e }
        }
    }

    static async deleteVision(visionId) {

        try {
            return await visions.deleteOne({
                _id: new ObjectId(visionId)
            })
        } catch (e) {
            console.error(`Unable to delete visions: ${e}`)
            return { error: e }
        }
    }

}