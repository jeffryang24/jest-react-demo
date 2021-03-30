import { NextApiRequest, NextApiResponse } from 'next';

import { people } from '../../../mocks/people';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(people);
}
