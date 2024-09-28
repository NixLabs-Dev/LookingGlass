import { Sites } from '@/util/vars';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CommandAPIResponse } from '@/util/api';
import { RouterType } from '@/util/util';

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RouterType[]>
) {
    return res.status(200).json(Sites)
}