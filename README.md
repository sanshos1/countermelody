# Countermelody

_A listening note for two lines_

## The question

Two melodies can be different without forming counterpoint. They may copy the same contour, crowd the same rhythmic space, or collide with the artistic intention. Countermelody freezes an anchor voice beside a proposed counter voice and asks validators to judge the relationship as a single immutable record.

## What the contract hears

`analyze_pair` is one complete action, not a lobby or an accumulating score. Validators inspect the anchor, counterline, and artistic intent together. They verify five stored findings: relationship class, contour independence, harmonic fit, rhythmic space, and a bounded set of friction flags. Contract code derives the final seal as `INTERLOCKED`, `PRODUCTIVE_TENSION`, or `REWRITE`.

The input text and its SHA-256 fingerprints remain attached to the result. Duplicate record IDs, identical voices, and thin prompts are rejected before consensus. No audio is generated and no popularity vote is taken.

## Reading the edition

The public interface is a split listening surface. The two voices occupy opposite sides of a rotating relationship diagram; the immutable verdict appears below as a record seal with three independent checks and both fingerprints. There are no roles to fill, no progress track, and no strike counter.

## Reproduce

```text
python -m venv .venv-studionet
.venv-studionet/Scripts/python -m pip install -r requirements-studionet.txt
genvm-lint lint contracts/contract.py
python -m pytest tests/test_surface.py -q
cd frontend
npm install
npm run typecheck
npm run build
```

The stable `genlayer-py 0.18.0` pin is intentional for StudioNet transaction encoding. The Consensus preview SDK targets Studio Dev and must not be substituted for this deployment workflow.

## Published record

- Network: StudioNet
- Contract: [`0x6a4bA67cee717E5D3Fc2a2f63852c11064DA9712`](https://explorer-studio.genlayer.com/address/0x6a4bA67cee717E5D3Fc2a2f63852c11064DA9712)
- Deployment receipt: [`0xbec9624e6d6b717192c5883194c4e1ecb9d1173ecbde83d791440d5704839468`](https://explorer-studio.genlayer.com/transactions/0xbec9624e6d6b717192c5883194c4e1ecb9d1173ecbde83d791440d5704839468)
- Finalized analysis: [`PAIR-1791052224`](https://explorer-studio.genlayer.com/transactions/0xc1451af0d857856e38f49df1307da28db0d070de3cb4305769c799bed736450c)
- Public listening room: https://sanshos1-countermelody.pages.dev/
