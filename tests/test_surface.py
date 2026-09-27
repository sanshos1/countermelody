from pathlib import Path
s=(Path(__file__).parents[1]/'contracts'/'contract.py').read_text()
def test_surface():
 for n in ['open_score','audition','get_score','get_auditions_page','get_scores_page','get_summary']:assert f'def {n}' in s
def test_safety():
 for n in ['run_nondet_unsafe','actor in players','len(seated)==len(roles)','int(s.discord)>=3','role in seated']:assert n in s
