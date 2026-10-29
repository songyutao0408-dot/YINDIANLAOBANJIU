"""Rebuild checkpoint 1 from immutable user inputs. Python 3.12 + librosa."""
from pathlib import Path
import json, re, math, hashlib, shutil
import numpy as np
import librosa
ROOT = Path(__file__).resolve().parents[1]
def save(path, obj):
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
def main():
    assets, public = ROOT/'assets', ROOT/'public'
    public.mkdir(exist_ok=True)
    audio = next(assets.glob('*.mp3'))
    y, sr = librosa.load(audio, sr=22050, mono=True)
    duration = len(y)/sr
    tempo, frames = librosa.beat.beat_track(y=y, sr=sr, hop_length=512)
    beats = librosa.frames_to_time(frames, sr=sr, hop_length=512).tolist()
    energy = [{'time':round(i/sr, 6), 'rms':float(np.sqrt(np.mean(y[i:i+sr//2]**2)))} for i in range(0,len(y),sr//2)]
    save(public/'beats.json', {'bpm':float(np.asarray(tempo).item()), 'times':beats, 'method':'librosa beat_track; candidate grid, not manually verified'})
    save(public/'energy.json', energy)
    lrc = next(assets.glob('*.lrc'))
    try: raw=lrc.read_text(encoding='utf-8-sig')
    except UnicodeDecodeError: raw=lrc.read_text(encoding='gbk')
    events=[]
    for source_line,line in enumerate(raw.splitlines(), 1):
        matches=list(re.finditer(r'\[(\d+):(\d+(?:\.\d+)?)\]',line))
        if not matches: continue
        text=line[matches[-1].end():].strip()
        for m in matches: events.append({'time':round(int(m[1])*60+float(m[2]), 6),'text':text,'sourceLine':source_line})
    events.sort(key=lambda e:e['time'])
    timeline=json.loads((assets/'timeline.json').read_text())
    for i,e in enumerate(events):
        e['kind']='title' if i<3 else ('lyric' if e['text'] else 'clear')
        e['end']=events[i+1]['time'] if i+1<len(events) else 271.0
        e['fadeOutStart']=max(e['time'],e['end']-.2)
    sections=[]
    counts=[8,4,3,4,4,4,5,4,6,7,11,3,4,5,4,5,4,5,4,8]
    for index,s in enumerate(timeline['sections']):
        s=dict(s); s['end']=duration if s['end']=='audio_end' else s['end']
        s['fromFrame']=round(s['start']*24); s['endFrame']=math.ceil(duration*24) if index==19 else round(s['end']*24)
        s['lyrics']=[e for e in events if e['kind']=='lyric' and s['start']<=e['time']<s['end']]
        s['clearTimes']=[e['time'] for e in events if e['kind']=='clear' and s['start']<=e['time']<s['end']]
        s['plannedShots']=counts[index]
        sections.append(s)
    manifest={'duration':duration,'fps':24,'durationInFrames':math.ceil(duration*24),'audioFile':'song.mp3','audioSha256':hashlib.sha256(audio.read_bytes()).hexdigest(),'s18Boundary':{'time':271,'status':'provisional; mixed-track energy cannot establish vocal end; listening review required'},'sections':sections,'title_cards':timeline['title_cards'],'gags':timeline['gags']}
    save(public/'manifest.json',manifest); save(public/'lyrics.json',events)
    for p in assets.iterdir():
        if p.is_file(): shutil.copy2(p,public/('song.mp3' if p.suffix=='.mp3' else p.name))
    rows=['# 检查点 1 · 段落与镜头计划','',f'解码音频时长：{duration:.6f} 秒；24 fps；{manifest["durationInFrames"]} 帧。节拍候选 BPM：{float(np.asarray(tempo).item()):.2f}。','', '歌词按时间区间分配；空白时间戳清空；前三条用于片头卡。每句触发动作，镜头切换与动作触发分开设计。','', '| 段落 | 起止（秒） | 色调 | 镜头数 | 歌词（时间 → 原文件行号） |', '|---|---|---|---:|---|']
    for s in sections:
        lines='<br>'.join(f'{e["time"]:.2f} → [LRC 第 {e["sourceLine"]} 行](../assets/lyrics.lrc#L{e["sourceLine"]})' for e in s['lyrics']) or '纯音乐 / 片头卡'
        rows.append(f'| {s["id"]} {s["name"]} | {s["start"]:.2f}–{s["end"]:.2f} | {s["mode"]} | {s["plannedShots"]} | {lines} |')
    rows+=['','## 制作约束与待确认项','',f'- 全片计划 {sum(counts)} 个镜头，平均 {duration/sum(counts):.2f} 秒/镜头。副歌与说唱允许更密的快切；同一句内部也可触发动作。','- 原始 assets 不修改。音频复制到 public/song.mp3，其余素材同名复制。','- 时间映射采用半开区间 [start, end)，统一 round(t×24)，最后一帧向上取整。量化误差最多 0.02084 秒。','- S18/S19 暂保留 271.00 秒。混合音轨 RMS 不等同于人声检测，需结合听感复核后才能宣称已校准。','- 最后一行 LRC 没有清空标记：派生字幕暂于 271 秒清空，原 LRC 不改。','- 休息梗 199.08–201.63 秒；缺词梗 245.35–247.40 秒，246.58 秒字幕先清空。','- S0 三张卡内部加入微动和推镜；原设定“定格”只停主姿态，保留眨眼、尘埃等微动。','- 字幕对齐目前以用户 LRC 为依据，尚未完成听感逐句验证，不宣称 ≤0.15 秒已验收。','- 检查点 1 仅为技术时间表，不代表角色、背景或成片视觉效果。']
    (ROOT/'checkpoints/01-timeline.md').write_text('\n'.join(rows)+'\n')
    print(json.dumps({'duration':duration,'frames':manifest['durationInFrames'],'beats':len(beats),'sections':len(sections),'lyricLines':sum(e['kind']=='lyric' for e in events),'shots':sum(counts)}))
if __name__=='__main__': main()
