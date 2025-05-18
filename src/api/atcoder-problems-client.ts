import { ApiError, err, ok, Result } from '../core/types/result';
import { Submission } from '../core/types/submission';

export class AtCoderProblemsClient {
  private readonly baseUrl = 'https://kenkoooo.com/atcoder/atcoder-api/v3';

  async fetchSubmissions(userId: string, fromSecond: number): Promise<Result<Submission[]>> {
    try {
      const url = new URL(`${this.baseUrl}/user/submissions`);
      url.searchParams.append('user', userId);
      url.searchParams.append('from_second', fromSecond.toString());

      const response = await fetch(url);

      if (!response.ok) {
        return err(
          new ApiError(`Failed to fetch submissions: ${response.statusText}`, response.status)
        );
      }

      const submissions = (await response.json()) as Submission[];
      return ok(submissions);
    } catch (error) {
      return err(
        new ApiError('Failed to fetch submissions from AtCoder Problems API', undefined, error)
      );
    }
  }
}
