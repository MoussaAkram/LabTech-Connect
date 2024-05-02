import VisionDAO from "../dao/visionsDAO.js";

export default class VisionsController {
    

    static async apiGetVisions(req, res, next) {
        try {
            const visions = await VisionDAO.getVision();
            res.json(visions);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetVisionsById(req, res, next) {
        try {
            
            const visionsId = req.params.id;
            const vision = await VisionDAO.getVisionById(visionsId);
            console.log(vision)
            if (!vision) {
                res.status(404).json({ error: "visions not found" });
            }
            res.json(vision);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiPostVisions(req, res, next) {
        try {
            const containersId = req.body.containersId
            const email = req.body.email
            const item = req.body.item
            const titre =  req.body.titre
            const contenants =  req.body.contenants
            // const file = req.body.file
            const fileImage = req.body.fileImage
            const fileVideo = req.body.fileVideo


            console.log('containersId:', containersId)
            console.log('item:', item)
            console.log('titre:', titre)
            console.log('contenants:', contenants)
            console.log('file:', fileImage)
            console.log('email:', email)

            const VisionsResponse = await VisionDAO.addVision(
                containersId,
                email,
                item ,
                titre,
                contenants,
                // file
                fileImage,
                fileVideo
        
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateVisions(req, res, next) {
        try {
            const visionId = req.params.id
            const item = req.body.item
            const titre = req.body.titre
            const contenants = req.body.contenants
            const fileImage = req.body.fileImage;
            const fileVideo = req.body.fileVideo;
            console.log('visionId:', visionId)
            console.log('titre:', titre)
            console.log('contenants:', contenants)
            console.log('file:', fileImage)


            const VisionsResponse = await VisionDAO.updateVisions(
                visionId,
                item ,
                titre,
                contenants,
                fileImage,
                fileVideo

            )
            console.log('VisionsResponse:', VisionsResponse)
            var { error } = VisionsResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (VisionsResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update Visions - Visions may not exist",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteVisions(req, res, next) {
        try {
            const visionId = req.params.id;
            console.log(visionId)
            const visionsResponse = await VisionDAO.deleteVision(visionId)
            if (visionsResponse.deletedCount === 0) {
                throw new Error("Unable to delete visions - visions may not exist.");
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}