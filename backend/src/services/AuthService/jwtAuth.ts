import passport from "passport";

export const requireJWTAuth = passport.authenticate("jwt", { session: false });