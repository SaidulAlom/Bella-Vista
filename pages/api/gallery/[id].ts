import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('gallery');
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (req.method === 'GET') {
    const item = await collection.findOne({ _id: new ObjectId(id) });
    return res.status(200).json(item);
  }

  if (req.method === 'PUT') {
    const updates = req.body;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    const updated = await collection.findOne({ _id: new ObjectId(id) });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
