import IncrediblyInsecureCrypto from "../../crypto/mod.ts";

class ChallengeService {
  #challenges: { [userId: string]: string } = {};

  public async newChallenge(userId: string): Promise<string> {
    return this.#challenges[userId] = IncrediblyInsecureCrypto.randomString(
      256,
    );
  }
}

const challengeService = new ChallengeService();

export default challengeService;
