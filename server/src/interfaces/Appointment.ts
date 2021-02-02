interface IAppointment {
    client: {
        fullName: string
        phone: number
        _id: string
    }
    date: string
    hour: string
}

export { IAppointment }