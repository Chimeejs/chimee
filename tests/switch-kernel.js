import Chimee from '../src/index';
import chai from 'chai';
const { expect } = chai;
describe('check for chimee switch kernel function', () => {
  it('should not trigger volume change', async function() {
    this.timeout(10000);
    let count = 0;
    const chimee = new Chimee({
      wrapper: document.createElement('wrapper'),
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      volume: 0.2,
    });
    chimee.on('volumechange', evt => {
      console.log(evt);
      count++;
    });
    try {
      await chimee.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { immediate: true });
    } catch (error) {
      console.error(error);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(count).to.equal(0);
  });
});
