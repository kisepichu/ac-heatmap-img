import { Submission } from './submission';

export interface SubmissionCache {
  submissions: Submission[];
  lastEpochSecond: number;
  userId: string;
  updatedAt: number;
}
