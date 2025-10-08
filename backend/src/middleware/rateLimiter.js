// Free databases are deleted by automation after 14 days of inactivity.
// import rateLimit from "../config/upstash.js";
// const rateLimiter = async (req, res, next) => {
// try {
//   const { success } = await rateLimit.limit("[user_id]");
//   if (!success) {
//     return res.status(429).json({ message: "Too many requests" });
//   }
//   next();
// } catch (error) {
//   console.log("Ratelimit Error", error);

//   if (
//     error.cause?.code === "ENOTFOUND" ||
//     error.message.includes("fetch failed")
//   ) {
//     console.warn("⚠️ Upstash unreachable — skipping rate limit temporarily");
//     return next();
//   }

//   next(error);
// }
// next();
// };

// export default rateLimiter;
