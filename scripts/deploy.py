import json,re
from pathlib import Path
from genlayer_py import create_account,create_client
from genlayer_py.chains import studionet
R=Path(__file__).parents[1];e=(R.parents[3]/'accounts.env').read_text();k=re.search(r'^ACCOUNT_3_GENLAYER_PRIVATE_KEY\s*=\s*"?([^"\r\n]+)',e,re.M).group(1).strip();a=create_account(account_private_key=k);c=create_client(chain=studionet,account=a);t=c.deploy_contract(code=(R/'contracts'/'contract.py').read_text(),args=[]);print('deploy_tx='+str(t),flush=True);q=c.wait_for_transaction_receipt(transaction_hash=t,wait_until='finalized',retries=180,interval=5000,full_transaction=True);l=(q.get('consensus_data',{}).get('leader_receipt')or[{}])[0];z=q.get('data',{}).get('contract_address')or q.get('to_address');print(json.dumps({'wallet':a.address,'contract':z,'deploymentTx':str(t),'consensus':q.get('result_name'),'execution':l.get('execution_result')},default=str),flush=True)
