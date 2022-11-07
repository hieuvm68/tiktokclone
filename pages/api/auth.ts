import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const doc = req.body;
        console.log('auth.ts', doc)
        client.createIfNotExists(doc).then(() => {
            res.status(201).json('Login successful');
        });
    }

}