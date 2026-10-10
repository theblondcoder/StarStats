import session from 'express-session';

const sessionSecret = process.env.SESSION_SECRET || "change-me-in-development";

const sessionConfig = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
});

export default sessionConfig;
