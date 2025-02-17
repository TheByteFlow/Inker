export const env = {
    get PORT() {
        return process.env.PORT
    },
    get MONGO_URI() {
        return process.env.MONGO_URI
    },
    get JWT_ACCESS_SECRET() {
        return process.env.JWT_ACCESS_SECRET;
      },
      get JWT_REFRESH_SECRET(){
        return process.env.JWT_REFRESH_SECRET;
      },
      get REDIS_URI() {
        return process.env.REDIS_URI;
      },
      get CLOUDINARY_API_KEY() {
        return process.env.CLOUDINARY_API_KEY!;
      },
      get CLOUDINARY_API_SECRET() {
        return process.env.CLOUDINARY_API_SECRET!;
      },
}