import { Player } from './player';

export abstract class Card {

  protected constructor(
    private readonly _name: string,
    private readonly _cost: number,
    private readonly _actionPoint: number
  ) {}

  /**
   * Return number of cards of this type in supply.
   * default value is 5.
   * @param playerCount
   */
  public supplyCount(playerCount: number): number {
    return 5;
  }

  public async onGain(player: Player): Promise<void> {};

  public async onPlay(player: Player): Promise<void> {
    player.turn.action += this._actionPoint;
  };

  get name(): string {
    return this._name;
  }

  get cost(): number {
    return this._cost;
  }
}

/**
 * The succession card is used to raise the succession point.
 * You can enroll this card with your princess in phase 2
 * and get a score by registering it.
 */
export class Succession {

  constructor(
    // FIXME: using readonly here.
    protected _successionPoint: number
  ) {}

  get successionPoint(): number {
    return this._successionPoint;
  }

  async onEnroll(player: Player): Promise<void> {
    player.currentSuccessionPoint += this._successionPoint;
    return Promise.resolve();
  }
}

/**
 * The land card is used to earn gold on your turn.
 * You can play this card in phase 1 and get a gold.
 */
export class Land {

  constructor(
    // FIXME: using readonly here.
    protected _value: number
  ) {}

  get value(): number {
    return this._value;
  }
}
