'use client';
import { createAccount, createClient } from 'genlayer-js';
import { studionet } from 'genlayer-js/chains';

export const ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x6a4bA67cee717E5D3Fc2a2f63852c11064DA9712') as `0x${string}`;
const endpoint = 'https://studio.genlayer.com/api';
const reader: any = createClient({ chain: studionet, endpoint, account: createAccount() });
let wallet: any;

export async function connect() {
  const provider: any = (window as any).ethereum;
  if (!provider) throw Error('Rabby or MetaMask is required for writes');
  const [account] = await provider.request({ method: 'eth_requestAccounts' });
  wallet = createClient({ chain: studionet, endpoint, account, provider });
  return account as string;
}

export const read = (name: string, args: any[] = []) => reader.readContract({ address: ADDRESS, functionName: name, args });

export async function write(name: string, args: any[] = [], progress: (state: string) => void = () => {}) {
  if (!wallet) throw Error('Connect wallet before analysis');
  progress('WALLET APPROVAL');
  const hash = await wallet.writeContract({ address: ADDRESS, functionName: name, args, value: 0n });
  progress('VALIDATORS LISTENING');
  await wallet.waitForTransactionReceipt({ hash, status: 'FINALIZED', retries: 120, interval: 5000 });
  progress('FINALIZED ON STUDIONET');
  return hash as string;
}
