'use client';

export function isValidUSSDCode(code: string): boolean {
  return code.startsWith('*') && code.endsWith('#');
}

export function formatUSSDCode(code: string): string {
  return code.replace(/[^0-9*#]/g, '');
}

export function getKeypadLetters(key: string): string {
  const letterMap: Record<string, string> = {
    '1': '',
    '2': 'ABC',
    '3': 'DEF',
    '4': 'GHI',
    '5': 'JKL',
    '6': 'MNO',
    '7': 'PQRS',
    '8': 'TUV',
    '9': 'WXYZ',
    '0': '+',
    '*': '',
    '#': ''
  };
  return letterMap[key] || '';
}