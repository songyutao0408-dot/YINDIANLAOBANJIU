# 制作进度

更新时间：2026-10-29（Asia/Shanghai）

## 当前检查点
检查点 1 已完成，等待用户确认时间表。不要自行跨入角色造型制作；MV_BRIEF.md 第八节要求每个检查点停下来展示。

## 项目位置与约定
- 原始上传内容位于 indian-dove-mv/，不是仓库根目录。
- 制作说明：indian-dove-mv/MV_BRIEF.md。
- 静态图与检查点报告：indian-dove-mv/checkpoints/。
- 预览：indian-dove-mv/previews/；成片：indian-dove-mv/final/。
- 本文件是唯一完整进度记录。新会话先读本文件，再读取制作说明。
- assets 保持只读；每个检查点独立提交并推送。

## 已完成
- Remotion + React + TypeScript 工程及锁文件，1920×1080、24fps。
- Python/librosa 分析脚本：解码长度 304.509388 秒，7309 帧；472 个候选节拍；每 0.5 秒 RMS。
- LRC 支持 UTF-8/GBK，解析 69 句歌词、3 条片头卡及空白清空事件；按时间分配 20 段。
- 修正浮点时间边界：199.08 秒念白属于 S13，不属于 S12。
- 102 镜头计划及逐段歌词表：checkpoints/01-timeline.md；可视时间表：checkpoints/01-timeline.png。
- ZCOOL KuaiLe、Rye 本地字体及 OFL 许可。
- public/beats.json、energy.json；manifest.json、lyrics.json 由分析脚本本地生成，不提交完整派生歌词副本。
- 技术静帧 checkpoints/01-timing-slate.png，以及 previews/01-timing-smoke.mp4（歌曲 35–37 秒，非成片画风）。

## 验证
- npm run typecheck 通过。
- tools/check_checkpoint.py 通过：20 段连续无帧缝隙、69 句不漏不重、标题/清空事件、节拍范围、念白边界。
- Remotion CLI 实际渲染成功；静帧已目视检查。
- ffprobe 确认测试片为 960×540、24fps、H.264 视频 + AAC 音轨，时长约 2 秒。
- 当前主机网卡枚举报 uv_interface_addresses 错误，已通过仅在枚举失败时返回本地回环的 tools/loopback.cjs 解决；复现命令见工程 README。

## 尚未验收 / 待校准
- 节拍为自动候选，尚未逐拍听检。
- S18/S19 分界暂保留 271 秒；混合音轨 RMS 不能可靠识别人声结束，仍需听感复核。
- 最后一句 LRC 无清空事件，派生数据暂于 271 秒清空，未修改原 LRC。
- 逐句听感同步及 ≤0.15 秒误差尚未验收。
- 当前 composition 是技术校验画面，不是角色、背景或成片提案。
- 尚未制作任何角色、场景与正式 MV 段落。

## 下一步
用户确认检查点 1 后，进入检查点 2：独立 SVG 角色组件、全部角色排布图、主角全部表情设定图。该检查点提交推送并更新本文件，再等待造型确认。

## 发布记录
Git 命令行缺少凭据，改用 GitHub 插件。自动审批拒绝重复发布完整派生歌词数据；因此时间表引用原 LRC 行号，歌词派生 JSON 和副本仅本地生成、不再上传。工程、统计、图片及技术校验片照常提交。
