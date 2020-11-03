import { Communicator } from './types';
import InterfaceCommunicator from './communication';
import { TXs } from './txs';
import { Eth } from './eth';

class SDK {
  #communicator: Communicator;
  public readonly eth;
  public readonly txs;

  constructor(safeAppUrlsRegExp: RegExp[] = []) {
    if (typeof window === 'undefined') {
      throw new Error('Error initializing the sdk: window is undefined');
    }

    this.#communicator = new InterfaceCommunicator(safeAppUrlsRegExp);
    this.eth = new Eth(this.#communicator);
    this.txs = new TXs(this.#communicator);
    this.sendInitializationMessage();
  }

  private async sendInitializationMessage() {
    const response = await this.#communicator.send('getEnvInfo', undefined);

    console.log({ response });
  }
}

export default SDK;
