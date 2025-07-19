import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        const whiteList = [process.env.FRONT_URL]
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}