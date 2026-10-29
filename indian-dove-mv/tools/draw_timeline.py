from pathlib import Path
import json
from PIL import Image,ImageDraw,ImageFont
r=Path(__file__).resolve().parents[1];m=json.loads((r/'public/manifest.json').read_text())
im=Image.new('RGB',(1600,1510),'#F6E7C8');d=ImageDraw.Draw(im)
def font(n):return ImageFont.truetype(str(r/'public/fonts/ZCOOLKuaiLe-Regular.ttf'),n)
d.rectangle((0,0,1600,185),fill='#3A2418');d.text((60,35),'印第安老斑鸠 / 检查点 01',font=font(48),fill='#F6E7C8');d.text((60,105),f'20 段 · 102 镜头计划 · {m["duration"]:.3f} 秒 · 24 fps · 7309 帧',font=font(28),fill='#F0A15E')
for i,s in enumerate(m['sections']):
 y=220+i*56
 if i%2==0:d.rectangle((40,y-4,1560,y+48),fill='#E9D7B8')
 d.text((60,y),s['id']+'  '+s['name'],font=font(27),fill='#3A2418')
 d.text((415,y),f'{s["start"]:6.2f} — {s["end"]:6.2f}s',font=font(25),fill='#3A2418')
 d.text((730,y),f'{len(s["lyrics"])} 句 / {s["plannedShots"]} 镜',font=font(24),fill='#3A2418')
 color='#5B4A7A' if 'night' in s['mode'] else '#C1502E'
 d.rectangle((970,y+7,970+int((s['end']-s['start'])*15),y+28),fill=color)
 d.text((60,1370),'S18/S19 暂定 271 秒；待听感校准。歌词逐句归属见同目录 Markdown。',font=font(27),fill='#8E3B2A')
 d.text((60,1420),'技术时间表，非角色 / 场景视觉提案。镜头数量在分镜制作中可微调。',font=font(25),fill='#3A2418')
im.save(r/'checkpoints/01-timeline.png')
