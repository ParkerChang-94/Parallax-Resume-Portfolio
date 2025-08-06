# Parallax Resume Portfolio（个人简历作品集）

A modern resume portfolio based on Vite + Three.js + LocomotiveScroll, featuring 3D robot model, video background, parallax scrolling, and interactive animation. Perfect for frontend developers to showcase their skills.
本项目是一个基于 Vite + Three.js + LocomotiveScroll 的现代前端简历作品集，支持3D机器人模型、视频背景、滚动视觉差、动画交互等酷炫效果，适合前端开发者展示个人能力。

## Features 主要特性
- Responsive design for all devices
- Smooth scrolling and parallax with LocomotiveScroll
- 3D robot model (GLB) with animation and mouse tracking (Three.js)
- Robot waves on entry, then walks, head follows mouse
- Video background and gradient text for a modern look
- Animated skill cards, timeline, smooth anchor scrolling

- 响应式设计，适配各类设备
- LocomotiveScroll 实现平滑滚动与滚动视觉差
- Three.js 加载 glb 格式机器人模型，支持动画与鼠标跟随
- 机器人进场挥手，随后自动走路，头部可跟随鼠标移动
- 视频背景与渐变文字，视觉效果现代
- 技能卡片、时间线动画、锚点平滑滚动等丰富交互

## Getting Started 安装与运行
```bash
# Clone the project
 git clone https://github.com/ParkerChang-94/Parallax-Resume-Portfolio.git
 cd resume-portfolio

# Install dependencies
 npm install

# Start dev server
 npm run dev

# Build for production
 npm run build
```

## Showcase 效果说明
- Top navigation, main area with video background, name, and 3D robot
- Robot waves on entry, then walks, head always follows mouse
- Robot floats with parallax as you scroll
- Animated skills, experience, contact sections

- 进入页面，顶部为导航栏，主区域为视频背景+名字+3D机器人
- 机器人进场先挥手，随后自动走路，头部始终跟随鼠标
- 页面滚动时，机器人随滚动产生视觉差浮动
- 技能、经历、联系等板块均有动画和交互

## Customization & Extension 自定义与扩展
- Replace `public/robot.glb` to use your own 3D model (with animation)
- Edit `src/styles/main.scss` for your own colors and layout
- 替换 `public/robot.glb` 可更换3D模型（需带动画）
- 修改 `src/styles/main.scss` 可自定义配色与布局

## Credits 致谢
- 3D model animations can be made with [Mixamo](https://www.mixamo.com/) or Blender
- Model sources: https://threejs.org/examples/#webgl_animation_skinning_morph, https://www.patreon.com/quaternius

Feel free to open an issue or PR for questions and suggestions!
如有问题或建议，欢迎提 Issue 或 PR！ 
