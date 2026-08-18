import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges basic tailwind classes', () => {
    expect(cn('p-4', 'm-4')).toBe('p-4 m-4')
  })

  it('handles conditional classes', () => {
    expect(cn('p-4', { 'm-4': true, 'text-red-500': false })).toBe('p-4 m-4')
    expect(cn('p-4', null, undefined, false, 0, '')).toBe('p-4')
  })

  it('handles array inputs', () => {
    expect(cn(['p-4', 'm-4'], 'text-center')).toBe('p-4 m-4 text-center')
    expect(cn(['p-4', { 'm-4': true }])).toBe('p-4 m-4')
  })

  it('resolves tailwind class conflicts', () => {
    expect(cn('px-2', 'p-4')).toBe('p-4')
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('handles arbitrary values properly', () => {
    expect(cn('bg-[#000000]', 'bg-[#111111]')).toBe('bg-[#111111]')
    expect(cn('w-[100px]', 'w-[200px]')).toBe('w-[200px]')
  })
})
