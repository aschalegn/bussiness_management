interface IService {
    name: string
    img: string
    price: number
}

interface IBusiness {
    _id: string,
    name: string,
    email: string,
    password: string,
    catrgory: string,
    services: [IService],
    logo: string,
    poster: string,
    joinDate: string,
    times: { openAt: string, closeAt: string },
    phones: [],
    about: string,
    socialMedia: [{ name: string, link: string }],
    workers: [IWorker],
    appointments: [IAppointment],
    clients: [],
    waitingList: [{
        client: IClient,
        workerId: string,
        date: string,
        time: string
    }]
}

interface IWorker {
    _id: string
    name: string
    phone: string
    times: { openAt: string, closeAt: string, jump: number },
    availableTimes: [string]
    role: string
    skills: [string]
    password: string
    email: string,
    profile: string
}

interface IClient {
    _id: string
    fullName: string
    phone: string
    businesses: [IBusiness]
    joinDate: Date
}

interface IAppointment {
    _id: string
    client: IClient
    barber: string
    date: string
    time: string
    style: string
    bussiness: string
};

export type { IBusiness, IAppointment, IWorker, IClient, IService }