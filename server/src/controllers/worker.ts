import { Business } from "../model/Bussiness"

const logINWorker = async (businessId: string, email: string, password: string) => {
    const worker = await Business.findOne({ _id: businessId, "workers._email": email });
    console.log(await worker);
    
}