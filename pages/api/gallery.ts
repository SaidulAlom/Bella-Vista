import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('gallery');

  if (req.method === 'GET') {
    const items = await collection.find({}).toArray();
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const { title, url, alt, image } = req.body;
    const result = await collection.insertOne({ title, url: url || image, alt, image });
    return res.status(201).json({ _id: result.insertedId, title, url: url || image, alt, image });
  }

  if (req.method === 'PUT') {
    const { _id, ...updates } = req.body;
    const { ObjectId } = require('mongodb');
    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updates });
    const updated = await collection.findOne({ _id: new ObjectId(_id) });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;
    const { ObjectId } = require('mongodb');
    await collection.deleteOne({ _id: new ObjectId(_id) });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
