'use client';

import { useEffect, useState } from 'react';
import { ADDRESS, connect, read, write } from '../lib/chain';

type Analysis = {
  id: string;
  anchor: string;
  counterline: string;
  intent: string;
  relation: string;
  independent_contour: boolean;
  harmonic_fit: boolean;
  rhythmic_space: boolean;
  flags: string[];
  verdict: string;
  anchor_digest: string;
  counterline_digest: string;
};

const short = (value?: string) => value ? `${value.slice(0, 9)}...${value.slice(-7)}` : 'not recorded';

export default function Page() {
  const [wallet, setWallet] = useState('');
  const [recordId, setRecordId] = useState('');
  const [anchor, setAnchor] = useState('');
  const [counterline, setCounterline] = useState('');
  const [intent, setIntent] = useState('');
  const [result, setResult] = useState<Analysis>();
  const [status, setStatus] = useState('READY TO COMPARE');

  const loadLatest = async () => {
    try {
      const page: any = await read('get_analyses_page', [0, 20]);
      const latest = (page.items || []).slice(-1)[0];
      if (latest) setResult(latest);
    } catch {}
  };

  useEffect(() => { loadLatest(); }, []);

  const submit = async () => {
    try {
      const hash = await write('analyze_pair', [recordId, anchor, counterline, intent], setStatus);
      setStatus(`FINALIZED ${hash.slice(0, 10)}...`);
      await loadLatest();
    } catch (error: any) {
      setStatus(error?.message || 'ANALYSIS FAILED');
    }
  };

  const checks = result ? [
    ['CONTOUR', result.independent_contour],
    ['HARMONY', result.harmonic_fit],
    ['SPACE', result.rhythmic_space],
  ] : [];

  return <main>
    <nav>
      <a className="wordmark" href="#top"><span>COUNTER</span><strong>MELODY</strong></a>
      <p>PAIR ANALYSIS / STUDIONET</p>
      <button onClick={async () => setWallet(await connect())}>{wallet ? short(wallet) : 'CONNECT WALLET'}</button>
    </nav>

    <section className="overture" id="top">
      <div className="edition">EDITION 01 / TWO VOICES</div>
      <h1>Do the lines<br/><em>answer</em> each other?</h1>
      <p className="lede">Freeze an anchor and a counter voice. Validators judge their relationship once. No performers, no open seats, no accumulating strikes.</p>
    </section>

    <section className="listening-room">
      <div className="orbit" aria-hidden="true">
        <i className="ring ring-one"/><i className="ring ring-two"/><i className="needle"/>
        <span>A</span><b>B</b>
      </div>
      <label className="voice anchor">
        <span>01 / ANCHOR VOICE</span>
        <textarea value={anchor} onChange={event => setAnchor(event.target.value)} placeholder="Describe the melodic line, contour, rhythm, and harmonic role that must remain recognizable."/>
      </label>
      <label className="voice counter">
        <span>02 / COUNTER VOICE</span>
        <textarea value={counterline} onChange={event => setCounterline(event.target.value)} placeholder="Describe the independent line that should converse with the anchor without merely copying it."/>
      </label>
    </section>

    <section className="intent-strip">
      <label><span>RECORD ID</span><input value={recordId} onChange={event => setRecordId(event.target.value)} placeholder="PAIR-001"/></label>
      <label className="intent"><span>ARTISTIC INTENT</span><input value={intent} onChange={event => setIntent(event.target.value)} placeholder="What relationship should the listener hear between these voices?"/></label>
      <button disabled={!wallet || recordId.length < 1 || anchor.length < 32 || counterline.length < 32 || intent.length < 24} onClick={submit}>HEAR THE RELATIONSHIP</button>
    </section>

    <section className={`verdict ${result ? 'has-result' : ''}`}>
      <div className="verdict-label">LATEST IMMUTABLE LISTENING</div>
      {result ? <>
        <div className="seal"><small>{result.relation}</small><strong>{result.verdict.replaceAll('_', ' ')}</strong><span>{result.id}</span></div>
        <div className="checks">{checks.map(([label, pass]) => <div key={String(label)}><b>{pass ? 'YES' : 'NO'}</b><span>{label}</span></div>)}</div>
        <div className="digests"><p>ANCHOR FINGERPRINT<br/><code>{short(result.anchor_digest)}</code></p><p>COUNTER FINGERPRINT<br/><code>{short(result.counterline_digest)}</code></p></div>
        <div className="flags"><span>FRICTION NOTES</span><strong>{result.flags.length ? result.flags.join(' / ') : 'NONE RECORDED'}</strong></div>
      </> : <div className="empty-result">The listening surface is blank. Submit a pair or read the latest onchain analysis.</div>}
    </section>

    <aside className="status"><span>TRANSACTION STATE</span><strong>{status}</strong></aside>
    <footer><span>SEMANTIC RELATIONSHIP, NOT AUDIO SYNTHESIS</span><a href={`https://explorer-studio.genlayer.com/address/${ADDRESS}`}>CONTRACT RECORD</a></footer>
  </main>;
}
