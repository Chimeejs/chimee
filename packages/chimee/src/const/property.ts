export const videoReadOnlyProperties = [
  'buffered',
  'currentSrc',
  'duration',
  'error',
  'ended',
  'networkState',
  'paused',
  'readyState',
  'seekable',
  'sinkId',
  'controlsList',
  'tabIndex',
  'dataset',
  'offsetHeight',
  'offsetLeft',
  'offsetParent',
  'offsetTop',
  'offsetWidth',
];

export const kernelProperties: IKernelProperty[] = [ 'isLive', 'box', 'preset', 'kernels', 'presetConfig' ];

type IKernelProperty = 'isLive' | 'box' | 'preset' | 'kernels' | 'presetConfig';
