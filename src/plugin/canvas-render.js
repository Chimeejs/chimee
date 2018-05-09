// @flow
import Plugin from '../dispatcher/plugin';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial, BoxGeometry, SphereBufferGeometry, VideoTexture, LinearFilter, RGBFormat, Vector3, Math as ThreeMath } from 'three';

export default class CanvasRender extends Plugin {
  __dispatcher: Dispatcher;
  ctx: CanvasRenderingContext2D;
  // $FlowFixMe: a extends declare
  $dom: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
  playing: boolean;
  render: Function;
  getContext: Function;
  setSize: Function;
  poller: Function;
  posterRender: Function;
  posterImageDom: HTMLImageElement;

  constructor(config: Object, ...args: any []) {
    const myConfig = {
      el: document.createElement('canvas'),
      penetrate: true,
      inner: true,
    };
    super(Object.assign(config, myConfig), ...args);
    this.poller = config.poller || this.defaultPoller;
    this.render = config.render || this.defaultRender;
    this.getContext = config.getContext || this.defaultGetContext;
    this.setSize = config.setSize || this.defaultSetSize;
    this.posterRender = config.posterRender || this.defaultPosterRender;
    // this.getContext();
    this.poller(this.render);
  }

  inited() {
    this.crossOrigin = 'anonymous';
    this.$on('play', () => {
      if (this.renderer) return;
      const { clientWidth: width, clientHeight: height } = this.$video;
      // const { innerWidth: width, innerHeight: height } = window;
      const scene = new Scene();
      const camera = new PerspectiveCamera(75, width / height, 1, 1100); // 创建摄影机
      // camera.position.z = 8;
      camera.target = new Vector3(0, 0, 0);

      const geometry = new SphereBufferGeometry(5, 20, 30);
      // invert the geometry on the x-axis so that all of the faces point inward
      geometry.scale(-1, 1, 1);

      const texture = new VideoTexture(this.$video);
      // const texture = new VideoTexture(video);
      texture.minFilter = LinearFilter;
      texture.format = RGBFormat;

      const material = new MeshBasicMaterial({
        map: texture,
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      const renderer = new WebGLRenderer({
        canvas: this.$dom,
      }); // 创建渲染器
      renderer.setSize(width, height); // 设置画布大小
      renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏

      // const sphere = new Mesh(geometry, material);
      // scene.add(sphere);
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;

      const geometry2 = new BoxGeometry(1, 1, 1); // 创建一个长方体，用来定义物体的形状

      const material2 = new MeshBasicMaterial({ color: 0xff0000 }); // 创建一个材质，用来定义物体的颜色

      const mesh2 = new Mesh(geometry2, material2); // 使用形状和素材，来定义物体

      scene.add(mesh2);

    // renderer.render(scene, camera);
    // this.setSize();
    // this.$css('video', 'display', 'none');
    });

  }

  defaultGetContext() {
    this.ctx = this.$dom.getContext('2d');
  }

  defaultPoller(fn: Function) {
    requestAnimationFrame(() => {
      fn.call(this);
      this.poller(fn);
    });
  }

  defaultRender() {
    const { lat = 0, phi = 0, theta = 0, lon = 0, distance = 50, camera, renderer, scene } = this;
    // lat = Math.max(-85, Math.min(85, lat));
    // phi = ThreeMath.degToRad(90 - lat);
    // theta = ThreeMath.degToRad(lon);

    // camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    // camera.position.y = distance * Math.cos(phi);
    // camera.position.z = distance * Math.sin(phi) * Math.sin(theta);
    // console.log(camera);
    // console.log(camera.target);

    // camera.lookAt(camera.target);
    // camera.position.set(100, 300, 100);//设置相机位置
    // camera.lookAt(new Vector3(0,0,0));//让相机指向原点

    renderer && renderer.render(scene, camera);
    // const {
    //   lon,
    //   lat,
    //   distance,
    // } = this._3D;

    // const phi = THREE.Math.degToRad(90 - lat);
    // const theta = THREE.Math.degToRad(-lon);

    // const camera = this.camera;

    // camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    // camera.position.y = distance * Math.cos(phi);
    // camera.position.z = distance * Math.sin(phi) * Math.sin(theta);
    // camera.lookAt(camera.target);
    // this.renderer.render(this.scene, this.camera);
    // if (this.poster && (this.paused || this.ended)) {
    //   this.posterRender();
    //   return;
    // }
    // this.ctx.drawImage(this.$video, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  defaultPosterRender() {
    // if (!this.posterImageDom) {
    //   this.posterImageDom = new Image();
    //   this.posterImageDom.src = this.poster;
    // }
    // this.ctx.drawImage(this.posterImageDom, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  defaultSetSize() {
    const { clientWidth: width, clientHeight: height } = this.$video;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.$dom.setAttribute('width', width.toString());
    this.$dom.setAttribute('height', height.toString());
  }
}
