import { Ethereum } from '../chains/ethereum/ethereum';
import { Avalanche } from '../chains/avalanche/avalanche';
import { Harmony } from '../chains/harmony/harmony';
import { Solana } from '../chains/solana/solana';
import { Uniswap } from '../connectors/uniswap/uniswap';
import { Pangolin } from '../connectors/pangolin/pangolin';
import { Serum } from '../connectors/serum/serum';

export async function getChain(chain: string, network: string) {
  let chainInstance: any;

  if (chain === 'ethereum') chainInstance = Ethereum.getInstance(network);
  else if (chain === 'avalanche')
    chainInstance = Avalanche.getInstance(network);
  else if (chain === 'harmony') chainInstance = Harmony.getInstance(network);
  else if (chain === 'solana') chainInstance = await Solana.getInstance(network);
  else throw new Error('unsupported chain');

  if (!chainInstance.ready()) {
    await chainInstance.init();
  }

  return chainInstance;
}

export async function getConnector(
  chain: string,
  network: string,
  connector: string | undefined
) {
  let connectorInstance: any;

  if (chain === 'ethereum' && connector === 'uniswap')
    connectorInstance = Uniswap.getInstance(chain, network);
  else if (chain === 'avalanche' && connector === 'pangolin')
    connectorInstance = Pangolin.getInstance(chain, network);
  else if (chain === 'solana' && connector === 'serum')
    connectorInstance = Serum.getInstance(chain, network);
  else throw new Error('unsupported chain or connector');

  if (!connectorInstance.ready()) {
    await connectorInstance.init();
  }

  return connectorInstance;
}
