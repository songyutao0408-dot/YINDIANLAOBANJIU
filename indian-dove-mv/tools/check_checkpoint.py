from pathlib import Path
import json, math
r=Path(__file__).resolve().parents[1]
m=json.loads((r/'public/manifest.json').read_text()); lyrics=json.loads((r/'public/lyrics.json').read_text()); beats=json.loads((r/'public/beats.json').read_text())['times']
s=m['sections']
assert len(s)==20 and s[0]['fromFrame']==0 and s[-1]['endFrame']==m['durationInFrames']
assert all(a['endFrame']==b['fromFrame'] for a,b in zip(s,s[1:]))
assert sum(len(x['lyrics']) for x in s)==sum(e['kind']=='lyric' for e in lyrics)==69
assert all(0<=b<m['duration'] for b in beats) and beats==sorted(beats)
assert all(e['end']>=e['time'] for e in lyrics)
assert sum(e['kind']=='title' for e in lyrics)==3
assert any(e['kind']=='clear' and abs(e['time']-246.58)<.001 for e in lyrics)
print('PASS: 20 contiguous sections, 69 lyric lines, 3 title cards, clear events, beat range, frame duration')

assert len(s[12]['lyrics'])==4 and len(s[13]['lyrics'])==4
assert s[13]['lyrics'][0]['time']==199.08
