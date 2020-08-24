import limitDigit from '../components/limitDigit.js';


describe('test converted number', () => {
    test("test long digits number", () => {
      const value = limitDigit(10.123456789012345678, 8);
      expect(value).toBe("10.12345679"); // after round up
    });
});
