import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Luiz',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Luiz&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Luiz',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe(
      'name=Luiz&profession=developer&abilities=JS,TDD',
    );
  });

  it('shoult throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Luiz',
      profession: 'developer',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Luiz&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Luiz';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
    });
  });

  it('should convert a query string to object taking care of comma separated values', () => {
    const qs = 'name=Luiz&abilities=JS,TDD';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
      abilities: ['JS', 'TDD'],
    });
  });
});
