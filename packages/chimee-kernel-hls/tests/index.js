import ChimeeKernelHls from '../src/index';
import chai from 'chai';
const { expect } = chai;
let videoElement;
beforeEach(function() {
  videoElement = document.createElement('div');
});
describe('dummy test', function() {
  describe('#1', function() {
    it('always passing', function() {
      const chimeeKernelHls = new ChimeeKernelHls(videoElement, {}, {});
      expect(true).to.equal(true);
    });
  });
});
