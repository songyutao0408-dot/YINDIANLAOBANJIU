# 制作进度

更新时间：2026-10-29（Asia/Shanghai）

## 当前检查点
用户已在本轮确认继续。检查点 1 通过；检查点 2 角色设定已完成，等待用户确认造型。MV_BRIEF.md 第八节要求每个检查点停下来展示。

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
- 角色设定已完成；场景与正式 MV 段落尚未制作。

## 下一步
用户确认检查点 2 造型后，进入检查点 3：各时段背景、小镇、篝火、白蚁丘及全局胶片质感，提交场景静帧后再等待确认。

## 发布记录
Git 命令行缺少凭据，改用 GitHub 插件。自动审批拒绝重复发布完整派生歌词数据；因此时间表引用原 LRC 行号，歌词派生 JSON 和副本仅本地生成、不再上传。工程、统计、图片及技术校验片照常提交。

## 检查点 2 · 角色设定
- 17 类角色的独立导出组件（两头野牛以同组件镜像/错相位实例化，共 18 个登场个体）。
- 老斑鸠共用一套轮廓：9 种表情、5 种动作、blink 控制；frame 驱动，按每 2 帧更新姿态。
- 配角完成基础造型与部分微动、眨眼入口；灰狼支持 cowboy 变体。完整剧情动作（偷窝、咒语、决斗等）在场景阶段实现，当前不声称全部动作完成。
- checkpoints/02-cast-sheet.png：2400×1800 全角色总览。
- checkpoints/02-expressions.png：1920×1800 主角九表情。
- checkpoints/02-poses.png：2400×850 主角五动作设定。
- previews/02-character-motion.mp4：10 秒无声动作测试，960×540，24fps，H.264。
- 全部角色使用手写 SVG/React，无 AI 图像或视频生成、无外部角色图片。
- 检查：TypeScript 通过；17 个组件服务端渲染有效、无 NaN；帧 10/11 输出相同，帧 12 动作变化；九表情与五姿态输出各不相同。
- 三张设定图目视检查完成；视频五个动作的采样画面已检查。躺倒姿态修正了变换中心，避免越界。
- 本次不包含歌词数据或原曲音轨的新增发布，测试片有意无声。
