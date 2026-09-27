import json,re
from pathlib import Path
from genlayer_py import create_account,create_client
from genlayer_py.chains import studionet
R=Path(__file__).parents[1];e=(R.parents[3]/'accounts.env').read_text();k=re.search(r'^ACCOUNT_3_GENLAYER_PRIVATE_KEY\s*=\s*"?([^"\r\n]+)',e,re.M).group(1).strip();c=create_client(chain=studionet,account=create_account(account_private_key=k));tx='0x7bdab905998360835e3a0a2bc1c0a8da517e4a3ed0897a863b0b39d42605bd8b';q=c.wait_for_transaction_receipt(transaction_hash=tx,wait_until='finalized',retries=180,interval=5000,full_transaction=True);l=(q.get('consensus_data',{}).get('leader_receipt')or[{}])[0];z=q.get('data',{}).get('contract_address')or q.get('to_address');print(json.dumps({'contract':z,'deploymentTx':tx,'consensus':q.get('result_name'),'execution':l.get('execution_result'),'stderr':l.get('stderr')},default=str),flush=True)
