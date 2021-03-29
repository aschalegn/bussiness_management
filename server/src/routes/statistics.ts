import { Request, Response, Router } from "express";
import { Appointment } from "../model/Appointment";
import { Business } from "../model/Bussiness";
const router = Router();
import { ObjectId } from "mongodb";

interface Query {
    from_date: string,
    to_date: string,
    business_id: String
}

const getStatistic = async (req: Request<unknown, unknown, unknown, Query>, res: Response) => {
    const { business_id, from_date, to_date } = req.query;
    const appointments = await Business.aggregate([
        { $match: { _id: new ObjectId(business_id.toString()) } },
        {
            $lookup: {
                from: "appointments",
                pipeline: [
                    {
                        $match: {
                            "date": { $gte: new Date(from_date), $lte: new Date(to_date) },
                        },
                    },
                ],
                as: "dates",
            },
        },
        {
            $project: {
                dates: 1, services: 1
            }
        },
    ]);
    res.status(200).send(appointments[0]);
};

router.route("/").get(getStatistic);

export default router;
