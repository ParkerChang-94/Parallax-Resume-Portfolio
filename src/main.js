import LocomotiveScroll from 'locomotive-scroll'
// 引入 Locomotive Scroll 的 CSS
import 'locomotive-scroll/dist/locomotive-scroll.css'
import './styles/main.scss'

// 环境配置
const isProd = import.meta.env.PROD
const basePath = isProd ? '/cool-website-resume' : ''
const modelPath = `${basePath}/robot.glb`

// 等待 DOM 完全加载
let scroll

// locomotive-scroll 滚动视觉差全局变量
window._scrollY = 0;
const initLocomotiveScroll = () => {
    // 初始化 Locomotive Scroll
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: true,
        multiplier: 1.2,
        class: 'is-reveal',
        getDirection: true,
        getSpeed: true,
        smartphone: {
            smooth: true,
            breakpoint: 767
        },
        tablet: {
            smooth: true,
            breakpoint: 1024
        }
    })

    // 监听滚动事件
    scroll.on('scroll', (args) => {
        window._scrollY = args.scroll.y;
        const navbar = document.querySelector('.navbar')

        if (args.scroll.y > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)'
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)'
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)'
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)'
        }
    })

    // 滚动显示动画
    scroll.on('call', (value, way, obj) => {
        if (value === 'reveal') {
            obj.el.classList.add('active')
        }
    })

    return scroll
}

// 平滑滚动到锚点
const initSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button')

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            const target = document.querySelector(targetId)

            if (target && scroll) {
                scroll.scrollTo(target, {
                    duration: 1200,
                    easing: [0.25, 0.0, 0.35, 1.0]
                })
            }
        })
    })
}

// 鼠标移动视差效果
const initMouseParallax = () => {
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const lerp = (start, end, factor) => {
        return start + (end - start) * factor
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5
        mouseY = e.clientY / window.innerHeight - 0.5
    })

    const updateParallax = () => {
        targetX = lerp(targetX, mouseX * 30, 0.1)
        targetY = lerp(targetY, mouseY * 30, 0.1)

        const heroContent = document.querySelector('.hero-content')
        const heroBg = document.querySelector('.hero-bg')

        if (heroContent) {
            heroContent.style.transform = `translate(${targetX * 0.5}px, ${targetY * 0.5}px)`
        }

        if (heroBg) {
            heroBg.style.transform = `translate(${-targetX}px, ${-targetY}px) scale(1.1)`
        }

        requestAnimationFrame(updateParallax)
    }

    updateParallax()
}

// 技能卡片交互效果
const initSkillCardEffects = () => {
    const skillCards = document.querySelectorAll('.skill-card')

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const otherCards = [...skillCards].filter(c => c !== this)
            otherCards.forEach(c => {
                c.style.opacity = '0.5'
                c.style.transform = 'scale(0.95)'
            })
        })

        card.addEventListener('mouseleave', function () {
            const otherCards = [...skillCards].filter(c => c !== this)
            otherCards.forEach(c => {
                c.style.opacity = '1'
                c.style.transform = 'scale(1)'
            })
        })
    })
}

// 时间线动画
const initTimelineAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item')

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active')
            }
        })
    }, observerOptions)

    timelineItems.forEach(item => {
        observer.observe(item)
    })
}

// 初始化所有功能
const init = () => {
    console.log('🚀 开始初始化简历网站...')

    // 等待一个事件循环后初始化
    setTimeout(() => {
        // 初始化 Locomotive Scroll
        initLocomotiveScroll()

        // // 初始化其他功能
        initSmoothScrolling()
        initMouseParallax()
        initSkillCardEffects()
        initTimelineAnimation()

        // 更新滚动
        setTimeout(() => {
            if (scroll) {
                scroll.update()
                console.log('✅ Locomotive Scroll 更新完成')
            }
        }, 100)

        console.log('🎉 简历网站初始化完成！')
    }, 50)
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

// 响应式更新
window.addEventListener('resize', () => {
    if (scroll) {
        setTimeout(() => {
            scroll.update()
        }, 100)
    }
})

// 页面重新获得焦点时更新
window.addEventListener('focus', () => {
    if (scroll) {
        scroll.update()
    }
})

// three.js 加载 robot.glb
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function initRobotModel() {
    const container = document.getElementById('robot-canvas-container')
    if (!container) return

    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 3)
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // 自适应函数
    const handleResize = () => {
        const width = container.clientWidth
        const height = container.clientHeight
        
        // 更新相机
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        
        // 更新渲染器
        renderer.setSize(width, height)
        
        // 更新画布样式
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
    }

    // 监听容器大小变化
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 灯光
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2, 4, 4)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))

    // three.js 动画混合器
    let mixer;
    const clock = new THREE.Clock();

    let headBone = null;
    let robotModel = null;
    // 加载 glb
    const loader = new GLTFLoader()
    // 使用环境配置的路径
    loader.load(modelPath, (gltf) => {
        const model = gltf.scene
        robotModel = model;
        model.scale.set(0.1, 0.1, 0.1)
        model.position.set(-1.2, -1, 0) // 设置基准y为-2.5，让机器人在画布底部
        scene.add(model)

        // 查找头部骨骼
        model.traverse(obj => {
            if (obj.isBone && obj.name === 'Head') {
                headBone = obj;
            }
        });

        // 动画部分
        const animations = gltf.animations;
        console.log(animations)
        if (animations && animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            const walkClip = animations.find(clip => clip.name === 'Walking' || clip.name === 'Walk');
            const waveClip = animations.find(clip => clip.name === 'Wave' || clip.name === 'wave');
            
            if (waveClip && walkClip) {
                // 移除wave动画中所有包含Head的轨道
                const filteredWaveTracks = waveClip.tracks.filter(track => !/Head/.test(track.name));
                const waveClipNoHead = new THREE.AnimationClip(waveClip.name, waveClip.duration, filteredWaveTracks);
                const waveAction = mixer.clipAction(waveClipNoHead);
                
                // 移除walk动画中所有包含Head的轨道
                const filteredWalkTracks = walkClip.tracks.filter(track => !/Head/.test(track.name));
                const walkClipNoHead = new THREE.AnimationClip(walkClip.name, walkClip.duration, filteredWalkTracks);
                const walkAction = mixer.clipAction(walkClipNoHead);
                walkAction.setEffectiveTimeScale(0.5);
                
                // 先播放wave，完成后平滑过渡到walk
                waveAction.setLoop(THREE.LoopOnce);
                waveAction.clampWhenFinished = true;
                waveAction.reset().fadeIn(0.3).play();
                
                // 监听wave动画完成
                mixer.addEventListener('finished', function onWaveFinished() {
                    mixer.removeEventListener('finished', onWaveFinished);
                    // 平滑过渡到walk
                    waveAction.fadeOut(0.5);
                    walkAction.reset().setLoop(THREE.LoopRepeat).fadeIn(0.5).play();
                });
            } else if (walkClip) {
                // 如果没有wave动画，直接播放walk
                const filteredWalkTracks = walkClip.tracks.filter(track => !/Head/.test(track.name));
                const walkClipNoHead = new THREE.AnimationClip(walkClip.name, walkClip.duration, filteredWalkTracks);
                const action = mixer.clipAction(walkClipNoHead);
                action.setEffectiveTimeScale(0.5);
                action.play();
            }
        }
        animate()
    })

    // 视觉差参数
    let scrollY = 0;
    // 监听 locomotive-scroll 的滚动事件
    if (scroll) {
        scroll.on('scroll', (args) => {
            window._scrollY = args.scroll.y;
        });
    } else {
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY || window.pageYOffset;
        });
    }

    // 动画
    let mouseX = 0
    let mouseY = 0
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    })
    function animate() {
        requestAnimationFrame(animate)
        if (mixer) mixer.update(clock.getDelta())
        // 让机器人头部骨骼跟随鼠标
        if (headBone) {
            const targetY = mouseX * Math.PI / 6;
            const targetX = -mouseY * Math.PI / 9;
            headBone.rotation.y += (targetY - headBone.rotation.y) * 0.1;
            headBone.rotation.x += (targetX - headBone.rotation.x) * 0.1;
        }
        // 视觉差：用 window._scrollY
        if (robotModel) {
            const scrollY = window._scrollY || 0;
            const baseY = -1; // 基准y位置（画布底部）
            robotModel.position.y = baseY + scrollY * 0.00095;
        }
        // 其余mesh跟随鼠标旋转（可选，保留原有）
        scene.traverse(obj => {
            if (obj.isMesh && obj.parent === scene) {
                const targetRotationY = mouseX * 0.5
                const targetRotationX = mouseY * 0.3
                obj.rotation.y += (targetRotationY - obj.rotation.y) * 0.05
                obj.rotation.x += (targetRotationX - obj.rotation.x) * 0.05
            }
        })
        renderer.render(scene, camera)
    }

    // 清理函数
    return () => {
        resizeObserver.disconnect()
        window.removeEventListener('resize', handleResize)
        if (renderer) {
            renderer.dispose()
        }
    }
}

// 页面加载后初始化机器人
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobotModel)
} else {
    initRobotModel()
}