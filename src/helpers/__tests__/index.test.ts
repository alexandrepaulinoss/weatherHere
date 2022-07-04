import {unitSymbol, speedUnity} from '../';

describe('unitSymbol is called', () => {
  it('returns the correct value', () => {
    expect(unitSymbol['imperial']).toBe('F');
    expect(unitSymbol['metric']).toBe('C');
    expect(unitSymbol['standard']).toBe('K');
  });
});

describe('speedUnity is called', () => {
  it('returns the correct value', () => {
    expect(speedUnity['imperial']).toBe('miles/hour');
    expect(speedUnity['metric']).toBe('meter/sec');
    expect(speedUnity['standard']).toBe('meter/sec');
  });
});
