import ContainerDAO from "../dao/containersDAO.js";
import AdminValidation from "../validation/validation.js"

const options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false,
    timeZone: 'UTC'
  }
export default class ContainersController {
    

    static async apiGetContainers(req, res, next) {
        try {
            const containers = await ContainerDAO.getContainer();
            res.json(containers);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetContainersById(req, res, next) {
        try {
            const containersId = req.params.id ;
            
            const container = await ContainerDAO.getContainerById(containersId);
            if (!container) {
                res.status(404).json({ error: "Container not found" });
            }
            res.json(container);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiPostContainers(req, res, next) {
        try {
            const { error } = await AdminValidation.containerValidation(req.body);
            if (error) {
                throw new Error(`Invalid request data: ${error.message}`);
            }

            const email = req.body.email
            const name =  req.body.name
            const speciality = req.body.speciality
            const contenants =  req.body.contenants
            const date = new Date().toLocaleString("en-GB", options)
            

            console.log('containersId:', email)
            console.log('titre:', name)
            console.log('contenants:', contenants)
            console.log('file:', date)


            const ContainersResponse = await ContainerDAO.addContainer(
                email,
                name,
                speciality,
                contenants,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateContainers(req, res, next) {
        try {
         
            const containerId = req.params.id
            const name = req.body.name
            const speciality = req.body.speciality
            const contenants = req.body.contenants
            const date = new Date().toLocaleString("en-GB", options)
            const image = req.body.image;
            console.log('containerId:', containerId)
            console.log('name:', name)
            console.log('contenants:', contenants)
            console.log('date:', date)
            console.log('image:', image)


            const ContainersResponse = await ContainerDAO.updateContainer(
                containerId,
                name,
                speciality,
                contenants,
                date,
                image,
            )
            console.log('ContainersResponse:', ContainersResponse)
            var { error } = ContainersResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ContainersResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update Containers - Containers may not exist",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteContainers(req, res, next) {
        try {
            const containerId = req.params.id;
            console.log(containerId)
            const containersResponse = await ContainerDAO.deleteContainer(containerId)
            if (containersResponse.deletedCount === 0) {
                throw new Error("Unable to delete container - container may not exist.");
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}