from pathlib import Path


SOURCE = (Path(__file__).parents[1] / "contracts" / "contract.py").read_text(encoding="utf-8")


def test_new_one_shot_surface_replaces_slot_lifecycle():
    for name in ["analyze_pair", "get_analysis", "get_analyses_page", "get_summary"]:
        assert f"def {name}" in SOURCE
    for removed in ["open_score", "audition", "discord", "seated", "players"]:
        assert f"def {removed}" not in SOURCE


def test_every_stored_consensus_field_is_named_in_validator_prompt():
    for field in ["relation", "independent_contour", "harmonic_fit", "rhythmic_space", "flags"]:
        assert field in SOURCE
    assert "Confirm the relation, all three booleans, and every flag" in SOURCE
    assert "Reject a candidate when any stored field is unsupported" in SOURCE


def test_deterministic_guards_and_derived_verdict_exist():
    for guard in ["analysis id already exists", "counterline must be distinct", "derive_verdict", "hashlib.sha256"]:
        assert guard in SOURCE


def test_originality_boundary_is_explicit():
    remediation = (Path(__file__).parents[1] / "REMEDIATION.md").read_text(encoding="utf-8")
    assert "one-shot paired analysis" in remediation
    assert "No ordered route" in remediation
