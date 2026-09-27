# Countermelody

_Conductor folio, rehearsal copy_

## Score cover

Countermelody is a cooperative composition game. A conductor freezes the key, pulse, movement goal, and open musical roles. Distinct performers then audition one textual motif each. The score is complete only when every role has been seated by validator consensus.

## Rehearsal marks

`open_score` creates the immutable arrangement brief. `audition` accepts one role and motif from a wallet that has not already performed. Validators listen for compatibility with the complete frozen score and already seated motifs. Deterministic contract code seats a fitting motif or adds one discord. Every role filled produces `COMPLETE`; three discords produce `CLASHED`.

Reads are available through `get_score`, `get_auditions_page`, `get_scores_page`, and `get_summary`.

## Performance setup

```text
genvm-lint lint contracts/contract.py
python -m pytest tests/test_surface.py -q
cd frontend
npm install
npm run typecheck
npm run build
```

The browser requests a wallet only for writes. This instrument describes musical ideas; it does not synthesize or upload audio.

## Coda

- Contract: `0x7e3Ea19eC9416682A06488B0a75e16BBe7Dd1002`
- Deployment: `0x7bdab905998360835e3a0a2bc1c0a8da517e4a3ed0897a863b0b39d42605bd8b`
- Public performance: https://sanshos1-countermelody.pages.dev/
