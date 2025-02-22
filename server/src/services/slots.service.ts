const SYMBOLS = ['Cherry', 'Lemon', 'Orange', 'Watermelon'] as const;

type rewardsType = {
  [K in (typeof SYMBOLS)[number]]: number;
};

export class SlotsService {
  private readonly _rewards: rewardsType;

  constructor() {
    this._rewards = {
      Cherry: 10,
      Lemon: 20,
      Orange: 30,
      Watermelon: 40,
    };
  }

  public get rewards() {
    return this._rewards;
  }

  private getRandomSymbol = () => {
    const indexRandom = Math.floor(Math.random() * SYMBOLS.length);
    return SYMBOLS[indexRandom];
  };

  public isWin = (slots: string[]): boolean => {
    return slots.every((slot) => slot === slots[0]);
  };

  public spin = (): string[] => {
    return [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
  };

  public cheat = (isWinning: boolean, credits: number): number => {
    // random
    if (!isWinning || credits < 40) {
      return 0;
    }
    // 30% chance to re-roll
    if (credits >= 40 && credits <= 60) {
      return 0.3;
    }
    // max cheat 60% to re-roll
    return 0.6;
  };
}
