<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 太阳系科普应用｜开发与部署指引（Vercel，私有仓库，安全最小改造）

> 目标：在保证功能的前提下进行最小改动，将密钥从前端移除，采用 Vercel Serverless 保护密钥；代码仅使用 `main` 分支；GitHub 私有仓库 + Vercel 自动部署；本地开发先验证，得到你的同意后再推送。

查看 AI Studio 原始应用：https://ai.studio/apps/drive/1GYxWIDXLzdocympeSndCBlLjMuoshRf6

## 架构与安全

- 前端（React + Vite）：仅负责界面与请求触发，调用相对路径 `POST /api/ask`。
- 服务端函数（Vercel Serverless）：`api/ask.ts` 在服务端读取 `GEMINI_API_KEY` 并调用 Gemini，不向前端泄露密钥。
- 密钥管理：
  - 生产环境在 Vercel 的 Environment Variables 设置 `GEMINI_API_KEY`。
  - 本地开发通过 `vercel dev` 注入本地环境变量，不再把密钥编译进前端。
- 代码改动（最小集）：
  - 新增 `api/ask.ts`（安全代理）。
  - `services/geminiService.ts` 改为 `fetch('/api/ask')`，保留原有 prompt 逻辑。
  - `vite.config.ts` 移除密钥注入，并将前端端口改为 `5173`，配置 `server.proxy` 将 `/api` 代理到 `http://localhost:3000`（Vercel 本地函数端口）。

## 分支与仓库

- 分支策略：仅使用 `main` 分支（按你的指示）。
- 仓库可见性：GitHub 私有仓库；Vercel 支持对接私有仓库并进行自动部署。
- 提交与审核：本地验证通过后，征得你的同意再推送到 GitHub 并触发 Vercel 部署。
- 敏感文件管理：`.env.local` 已在 `.gitignore` 中（`*.local`），不要将真实密钥写入仓库。

## 本地开发与验证

**前提**：Node.js 已安装；无 VPN 场景下可能需要手动开启网络访问以完成 CLI 登录与依赖安装。

1. 安装依赖：
   - `npm install`
2. 安装并登录 Vercel CLI（二选一）：
   - Homebrew（若可用）：`brew install vercel-cli`
   - NPM 全局：`npm i -g vercel`
   - 登录：`vercel login`
3. 配置本地环境变量（开发环境）：
  - 命令格式：`vercel env add <NAME> <ENV>`，示例：`vercel env add GEMINI_API_KEY development`（按提示粘贴密钥）
  - 或临时注入：在终端运行 `GEMINI_API_KEY=你的密钥 vercel dev`
4. 启动本地服务：
   - 启动 Serverless：`vercel dev`（默认监听 `http://localhost:3000`）
   - 启动前端：`npm run dev`（监听 `http://localhost:5173`，已将 `/api` 代理到 `3000`）
5. 访问：`http://localhost:5173`，选择行星并在问答区提问，观察浏览器网络请求命中 `/api/ask`。
6. 构建检查：`npm run build`（验证 TypeScript 与打包是否通过）。

## 部署到 Vercel（自动化）

1. 将本地代码推送到 GitHub 私有仓库（仅在你确认后执行）。
2. 在 Vercel Dashboard 关联该仓库，选择 Framework 为 Vite（静态前端 + Serverless Functions）。
3. 在 Vercel 项目的 Environment Variables 中设置：
   - `GEMINI_API_KEY`（Production / Preview / Development 根据需要分别设置）
4. 部署：
   - 每次 `main` 分支更新后，Vercel 自动构建并部署。
   - 生产访问路径形如 `https://your-project.vercel.app/`；`/api/ask` 由 Vercel 路由到 `api/ask.ts`。

## 安全要点（密钥不暴露）

- 前端代码与构建产物中不再包含 `GEMINI_API_KEY`（已移除 `vite.config.ts` 的编译期注入）。
- 任何用户访问仅能看到前端 JS，不会获取到服务端环境变量。
- 日志与错误返回统一处理，不泄露服务端栈信息。
- `.env.local` 仅用于本地占位或参考，不用于生产；切勿提交真实密钥。

## 运行与故障排查

- 如果 `/api/ask` 返回 500：检查 Vercel 本地是否注入了 `GEMINI_API_KEY`；并确认网络环境可访问 Gemini API。
- 如果前端请求失败（CORS/网络）：确认已同时运行 `vercel dev` 与 `npm run dev`，并确保 5173 → 3000 的代理生效。
- 如果构建失败：`npm run build` 查看错误；类型问题集中在新增 `api/ask.ts`，可按报错信息调整。

## 变更摘要（便于审计）

- 新增：`api/ask.ts`（服务端安全代理）。
- 更新：`services/geminiService.ts`（前端改为调用后端路由）。
- 更新：`vite.config.ts`（移除密钥注入、端口改为 5173、代理到 3000）。

---

### 原始 AI Studio 说明（保留）

**Prerequisites:**  Node.js

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app: `npm run dev`

---

## 太阳系可视化优化设计指南（讨论成果）

目标：在保持交互流畅与科普准确的前提下，提升“信息展示”与“轨道真实感”，并形成可迭代的工程实现路径。

### 信息卡片（四卡布局）
- 温度（橙色）：保留，传达环境极端性。
- 自转周期（紫色）：短于约 3 天用“小时”，长于约 3 天用“天”，避免超大数字不直观。
- 公转周期（青色）：统一以“地球日”为口径；短于约 2 年用“天”，长于约 2 年用“年”。
- 距离太阳（黄色）：主单位用“AU（天文单位）”；辅以“光行程时间”（太阳光到达该行星的时间），小于 60 显示“分钟”，否则显示“小时”（保留 1 位小数）。

说明：1 AU 约等于光行 8.317 分钟。距太阳的“光年”不展示，避免尺度混乱。

### 轨道形态（圆 → 椭圆）
- 采用椭圆轨道，太阳位于椭圆的一个焦点；比圆更符合真实且更美观，尤其对高偏心率行星（如冥王星）效果显著。
- 分阶段实现：
  - 基础版：椭圆形状与焦点偏移，动画暂保持常速（不做等面积定律）。
  - 进阶版：引入开普勒第二定律近似（近日点更快、远日点更慢），提升科学真实度。
  - 高级版：加入轨道倾角与主轴方位角，增强个体差异与识别度。
- 参考偏心率（近似）：水星 0.2056、金星 0.0068、地球 0.0167、火星 0.0934、木星 0.0489、土星 0.0565、天王星 0.0457、海王星 0.0113、冥王星 0.2488。

### 卫星与环的呈现
- 卫星：为主要行星展示代表性卫星（3–5 颗），沿小型椭圆/圆轨道旋转；支持点击查看简介。示例：地球（Moon）、火星（Phobos、Deimos）、木星（Io、Europa、Ganymede、Callisto）、土星（Titan、Enceladus）等；冥王星建议突出 Charon 共轨特性。
- 光环：强化土星光环；木星/天王星/海王星的暗淡光环以极低透明度与细线表现，避免误导“所有光环都很显著”。
- 小行星带与柯伊伯带：作为可选开关显示；半透明稀疏点带，默认关闭以避免拥挤。

### 交互与 UI 细节
- 点击热区：所有小体增设透明命中区域（最小半径约 24–30px），保证易选中（冥王星等）。
- 标签抗旋转：标签做“反向旋转”或相对行星固定锚点，提升可读性。
- 响应式：窄屏两列（信息密度优先），中大屏四列对称（美观优先）。
- 颜色与图标：统一编码（温度橙/自转紫/公转青/距离黄），增强视觉一致性。

### 数据与单位口径
- 指标口径：自转用“小时/天”，公转用“地球日/年”，距离用“AU”，并计算光行程时间用于直觉展示。
- 数据分层：将“可视化参数”（如半长轴、偏心率、动画时长）与“科普指标”（自转、公转、距离等）分离，便于维护与扩展。
- 国际化：单位与文案随语言切换（小时/天/年、分钟/小时），中英文一致。

### 实施阶段与验收
- 阶段 1（快速提升）：四卡信息展示落地；椭圆轨道基础版；土星光环强化；精选卫星可视化；交互热区与标签优化。
- 阶段 2（科学深化）：等面积近似的非匀速动画；小行星带/柯伊伯带开关；主要卫星轨道倾角与光环平面对齐。
- 阶段 3（细节完善）：每行星轨道参数精修（偏心率/倾角/方位角）；个别卫星特殊行为提示（如 Triton 逆行）。
- 验收标准：
  - 信息卡片单位与阈值切换正确，语言一致；
  - 轨道椭圆形态与焦点位置正确，整体观感提升；
  - 小体可点击与标签可读性良好；
  - 目标设备下动画流畅（60fps 目标）、网络与密钥安全无泄露。

### 性能与工程建议
- 优先使用合成层动画（transform），并对热点元素启用加速提示；逐帧计算仅在进阶阶段引入。
- 提供可开关的层级渲染（卫星/带），保障低配设备的可用性。
- 保持安全设计：密钥仅存在于服务端函数环境变量；前端仅调用相对路径接口，不记录敏感信息。

以上为当前讨论达成的指导性结论，可作为后续优化开发的依据与验收标准。
