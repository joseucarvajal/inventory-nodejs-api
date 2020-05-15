import { Pool } from 'pg';

import env from "../../env";

const pool = new Pool(env.pgSettings);

export default pool;