import Chimee from '../src/index';
describe('check for chimee switch kernel function', () => {
  it('should not trigger volume change', async function() {
    this.timeout(10000);
    let count = 0;
    const chimee = new Chimee({
      wrapper: document.createElement('wrapper'),
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      volume: 0.2,
    });
    chimee.on('volumechange', () => {
      count++;
    });
    try {
      await Promise.race([
        chimee.$silentLoad('http://cdn.toxicjohann.com/%E4%BA%8E%E6%98%AF.mp4', { immediate: true }),
        new Promise(resolve => setTimeout(resolve, 8900)),
      ]);
    } catch (error) {
      console.error(error);
    }
    expect(count).to.equal(0);
  });
});
