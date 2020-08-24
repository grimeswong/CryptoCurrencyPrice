import limitDigit from '../components/limitDigit.js';


describe('test converted number', () => {

    test("test long digits number", () => {
      const value = limitDigit(10.123456789012345678, 8);
      expect(value).toBe("10.12345679"); // after round up
    });

    test("test number with scientific notation", () =>{
      expect(limitDigit(10.12345678e-4, 8)).toBe("0.00101235");
    });

    test("test with string of decimal number", () => {
      expect(limitDigit("10.123456789012345678", 8)).toBe("10.12345679");
    })
});
