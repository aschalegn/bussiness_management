import { Request, Response, Router } from "express";
import {
    addBussiness, addWorker, getAvailableTimes,
    logIn, updateDetails, updatePassword, addService, addSocial
} from "../controllers/bussiness";
import { uploadImage, uploadMulter } from "../controllers/images";
import { Business } from "../model/Bussiness";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    addBussiness(req, res);
});

router.get("/login", (req, res) => {
    const { email, password } = req.query;
    logIn(email, password, res);
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateDetails(id, body)
        .then(updated => {
            if (updated) {
                return res.status(200).send(updated);
            }
            return res.status(500).end();
        }).catch(err => {
            return res.status(500).end(err);
        });
});

// logo and poster image
router.patch("/files/:id", uploadMulter.fields([{ name: 'poster' }, { name: 'logo' }]), async (req, res) => {
    const { id } = req.params;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    const { logo, poster } = files;
    const business = await Business.findById(id);
    if (await business) {
        const logoUrl = logo[0].location;
        if (logoUrl) {
            business.logo = logoUrl;
        }
        const posterUrl = poster[0].location;
        if (posterUrl) {
            business.poster = posterUrl;
        }
        business.save();
    }
    res.send(files);
});

router.patch("/setting/addWorker/:id", uploadMulter.single("profile"),(req, res) => {
    addWorker(req, res);
});

router.patch("/setting/social/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    addSocial(id, body)
        .then(links => {
            res.send(links);
        });
});

router.patch("/setting/services/:id", uploadMulter.single("img"), (req, res) => {
    const file = req.file as Express.MulterS3.File;
    const body = req.body;
    const { id } = req.params;
    addService(id, body, file)
        .then(service => {
            return res.status(201).send(service);
        });
});


router.get("/:id", (req, res) => {
    getAvailableTimes(req, res);
});

router.patch("/updatePassword", (req, res) => {
    const { email, password } = req.body;
    updatePassword(email, password)
        .then((isUpdated: Boolean) => {
            if (isUpdated) return res.status(200).send(true);
            return res.status(500).send(false);
        });
});

export default router