import json
import re
import time
from pathlib import Path

from genlayer_py import create_account, create_client
from genlayer_py.chains import studionet
from genlayer_py.types import TransactionStatus


ROOT = Path(__file__).parents[1]
ENV = (ROOT.parents[3] / "accounts.env").read_text(encoding="utf-8")
PRIVATE_KEY = re.search(r'^ACCOUNT_3_GENLAYER_PRIVATE_KEY\s*=\s*"?([^"\r\n]+)', ENV, re.M).group(1).strip()
ACCOUNT = create_account(account_private_key=PRIVATE_KEY)
CLIENT = create_client(chain=studionet, account=ACCOUNT)
ADDRESS = "0x6a4bA67cee717E5D3Fc2a2f63852c11064DA9712"

record_id = "PAIR-" + str(int(time.time()))
args = [
    record_id,
    "A patient four-note phrase rises by step, pauses on the third beat, and settles gently into the tonal center.",
    "A lower answering phrase moves in contrary motion, enters after the pause, and leaves the final cadence unobstructed.",
    "Create a calm call-and-response texture where both voices remain recognizable and share rhythmic space.",
]
tx = CLIENT.write_contract(address=ADDRESS, function_name="analyze_pair", args=args)
print("analysis_tx=" + str(tx), flush=True)
receipt = CLIENT.wait_for_transaction_receipt(
    transaction_hash=tx,
    status=TransactionStatus.FINALIZED,
    retries=180,
    interval=5000,
    full_transaction=True,
)
leader = (receipt.get("consensus_data", {}).get("leader_receipt") or [{}])[0]
if receipt.get("result_name") != "MAJORITY_AGREE" or leader.get("execution_result") != "SUCCESS":
    raise RuntimeError({"consensus": receipt.get("result_name"), "leader": leader})
state = CLIENT.read_contract(address=ADDRESS, function_name="get_analysis", args=[record_id])
proof = {
    "network": "StudioNet",
    "contract": ADDRESS,
    "recordId": record_id,
    "transaction": str(tx),
    "status": "FINALIZED",
    "consensus": receipt.get("result_name"),
    "execution": leader.get("execution_result"),
    "explorer": "https://explorer-studio.genlayer.com/transactions/" + str(tx),
    "state": state,
}
(ROOT / "evidence").mkdir(exist_ok=True)
(ROOT / "evidence" / "live-analysis.json").write_text(json.dumps(proof, indent=2), encoding="utf-8")
print(json.dumps(proof, indent=2), flush=True)
