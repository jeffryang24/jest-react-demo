import { NextApiRequest, NextApiResponse } from 'next';

import { people } from '../../../mocks/people';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const filteredPeople = people.filter((person) => person.id === id);

  if (filteredPeople.length > 0) {
    res.status(200).json(filteredPeople);
  } else {
    res.status(404).json({ message: `User with id: ${id} not found.` });
  }
}
