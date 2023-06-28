
export type Response = {
    status: {
        text: string,
        code: number
    },
    errors?: any,
    data?: any,
    id?: string,
    render?: string,
    type?: string,
    route_type?: string,
    user?: any,
    isLoggedIn?: boolean,
    message: string,
    isLoading: boolean,
}