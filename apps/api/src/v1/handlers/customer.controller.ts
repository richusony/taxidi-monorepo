import { Request, Response } from 'express';

export class CustomerController {
  sigInWithEmailAndPassword(req: Request, res: Response) {
    console.log('Reached Customer Controller!!');
    return res.json({ message: 'Reached Customer Controller!!' });
  }
}
