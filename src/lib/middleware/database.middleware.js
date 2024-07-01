import pg from 'pg'
const { Pool } = pg;
const pool = new Pool({
    // same as
    // user: process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
})

export const requireTransactionMap = {
    POST: true,
    PUT: true,
    DELETE: true,
}

export const connectDatabase = async (req,res,next) => {
    // resolve db client
    let dbClient = null;
    try {
        dbClient = await pool.connect();
        req.dbClient = dbClient;
        req.doTransaction = requireTransactionMap[req.method] === true; 
        if (req.doTransaction) {
            await req.dbClient.query('BEGIN');
        }
        console.info('Database connected');
        next();
    } catch (err) {
        res.status(503).end();
        next(err);
    }
}

export const commitDatabase = async (req,_res,next) => {
    if (req.doTransaction) {
        await req.dbClient.query('COMMIT');
    }  
    req.dbClient.release();
    req.dbClient = undefined;
    req.doTransaction = undefined;
    console.info('Database disconnected');
    next();
}

export const rollbackDatabase = async (err, req, res, next) => {
    if (req.doTransaction && req.dbClient){
        console.info('rollback transaction!');
        await req.dbClient.query('ROLLBACK');
        req.dbClient.release();
        req.dbClient = undefined;
        req.doTransaction = undefined;
    }
    console.info('--- ERROR ---');
    console.error(err);
    // need a way to detect app error from system error
    let errorCode = 500;
    if (err.isApplicationError === true) {
        errorCode = err.errorCode;
    }
    res.status(errorCode).json({
        error: err.message || "Cant process your request",
    });
    next();
}

