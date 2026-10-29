# MV 工程

## 复现检查点 1

```sh
npm ci
python -m pip install -r requirements.txt
python tools/analyze_audio.py
python tools/check_checkpoint.py
python tools/draw_timeline.py
npm run typecheck
npm run still
npm run preview
```

时间表图片需要 Pillow（`python -m pip install Pillow`）。运行分析将只读素材复制到 public，音轨统一为 public/song.mp3，不重复提交音轨。Google Fonts 的 ZCOOL KuaiLe 和 Rye 已本地保存，附 OFL 许可。

Remotion 的 `IndianDoveMV` 当前仅是技术时间轴画面，用于验证帧数、字体与音轨。它不是最终 MV。角色和场景须经过后续检查点审核。

部分受限 Linux 环境不能枚举网卡，可使用以下本地回环兼容设置（不需要修改 node_modules）：

```sh
NODE_OPTIONS=--require=./tools/loopback.cjs npm run still
NODE_OPTIONS=--require=./tools/loopback.cjs npm run preview
```

`npm run preview` 只渲染全曲第 35–37 秒的 540p 技术校验片。最终动画完成前不要把 `npm run render` 的技术画面当成最终交付。

资产统一留在本项目目录下；最终交付路径遵循用户最新要求，为 `final/indian-dove-mv-1080p.mp4`（替代 brief 旧的 out 路径）。

分析说明：节拍是 librosa 自动估计；energy.json 是每 0.5 秒 RMS；这两项都不能证明人声结束或歌词已达到 0.15 秒同步精度。S18/S19 边界及最后一句清空时间暂为 271 秒，需要后续听感复核。

派生歌词 JSON、manifest 与 public/lyrics.lrc 仅由分析脚本在本地生成，不提交重复歌词副本。时间表通过原始 LRC 行号标记每段包含哪些句子。
