# 🎨 jacksburgeruk.com – Jack's Burger UK

> This document outlines the core design tokens and visual language for the project. Use these guidelines to ensure consistency across the application.

## 1. Colors

The color system is defined by scales from 50 (lightest) to 950 (darkest), alongside semantic colors for specific intents.

### Primary

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f5f8f9` | `--color-primary-50` |
| 100 | `#ecf2f4` | `--color-primary-100` |
| 200 | `#d2e1e5` | `--color-primary-200` |
| 300 | `#b0ccd4` | `--color-primary-300` |
| 400 | `#81afbc` | `--color-primary-400` |
| 500 | `#5a94a5` | `--color-primary-500` |
| 600 | `#4c7d8a` | `--color-primary-600` |
| 700 | `#3e6570` | `--color-primary-700` |
| 800 | `#2f4d56` | `--color-primary-800` |
| 900 | `#263a40` | `--color-primary-900` |
| 950 | `#0b1214` | `--color-primary-950` |

### Secondary

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f5f9fa` | `--color-secondary-50` |
| 100 | `#eaf2f5` | `--color-secondary-100` |
| 200 | `#cee1e8` | `--color-secondary-200` |
| 300 | `#a9cddb` | `--color-secondary-300` |
| 400 | `#75b1c7` | `--color-secondary-400` |
| 500 | `#4c98b3` | `--color-secondary-500` |
| 600 | `#407f96` | `--color-secondary-600` |
| 700 | `#34677a` | `--color-secondary-700` |
| 800 | `#274f5d` | `--color-secondary-800` |
| 900 | `#213b45` | `--color-secondary-900` |
| 950 | `#0e1c21` | `--color-secondary-950` |

### Accent

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f5f8f9` | `--color-accent-50` |
| 100 | `#ecf2f4` | `--color-accent-100` |
| 200 | `#d2e1e5` | `--color-accent-200` |
| 300 | `#b0ccd4` | `--color-accent-300` |
| 400 | `#81afbc` | `--color-accent-400` |
| 500 | `#5a94a5` | `--color-accent-500` |
| 600 | `#4c7d8a` | `--color-accent-600` |
| 700 | `#3e6570` | `--color-accent-700` |
| 800 | `#2f4d56` | `--color-accent-800` |
| 900 | `#263a40` | `--color-accent-900` |
| 950 | `#0b1214` | `--color-accent-950` |

### Neutral

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#ffffff` | `--color-neutral-50` |
| 100 | `#f0f0f0` | `--color-neutral-100` |
| 200 | `#dbdbdb` | `--color-neutral-200` |
| 300 | `#c2c2c2` | `--color-neutral-300` |
| 400 | `#9e9e9e` | `--color-neutral-400` |
| 500 | `#808080` | `--color-neutral-500` |
| 600 | `#6b6b6b` | `--color-neutral-600` |
| 700 | `#575757` | `--color-neutral-700` |
| 800 | `#424242` | `--color-neutral-800` |
| 900 | `#333333` | `--color-neutral-900` |
| 950 | `#212121` | `--color-neutral-950` |

### Semantic Intents

| Intent | Hex | Token Variable |
|--------|-----|----------------|
| Success | `#22c55e` | `--color-success` |
| Warning | `#f59e0b` | `--color-warning` |
| Error   | `#ef4444` | `--color-error` |

## 2. Typography

### Font Families

- **Sans (Body):** `Poppins`
- **Display (Headings):** `Inter`

### Font Sizes

| Scale | Value | Token Variable |
|-------|-------|----------------|
| xs | `0.875rem` | `--font-size-xs` |
| sm | `1rem` | `--font-size-sm` |
| base | `1.125rem` | `--font-size-base` |
| xl | `1.25rem` | `--font-size-xl` |
| 2xl | `2rem` | `--font-size-2xl` |
| 3xl | `2.75rem` | `--font-size-3xl` |
| 4xl | `4rem` | `--font-size-4xl` |
| lg | `1.188rem` | `--font-size-lg` |

### Font Weights

| Name | Weight | Token Variable |
|------|--------|----------------|
| normal | `400` | `--font-weight-normal` |
| semibold | `600` | `--font-weight-semibold` |
| bold | `700` | `--font-weight-bold` |
| black | `900` | `--font-weight-black` |

## 3. Spacing & Sizing

| Scale | Value | Token Variable |
|-------|-------|----------------|
| 0 | `0` | `--spacing-0` |
| 3 | `0.625rem` | `--spacing-3` |
| 4 | `1rem` | `--spacing-4` |
| 5 | `1.25rem` | `--spacing-5` |
| 8 | `1.875rem` | `--spacing-8` |
| 33 | `8.125rem` | `--spacing-33` |
| 44 | `11rem` | `--spacing-44` |
| 47 | `11.625rem` | `--spacing-47` |

## 4. Borders & Shadows

### Border Radius

| Name | Value | Token Variable |
|------|-------|----------------|
| none | `0` | `--radius-none` |
| sm | `0.1875rem` | `--radius-sm` |
| md | `10%` | `--radius-md` |
| lg | `0.5rem` | `--radius-lg` |
| xl | `0.75rem` | `--radius-xl` |
| 2xl | `1rem` | `--radius-2xl` |
| full | `9999px` | `--radius-full` |

### Shadows

| Name | Value | Token Variable |
|------|-------|----------------|
| sm | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `--shadow-sm` |
| md | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | `--shadow-md` |
| lg | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | `--shadow-lg` |
| xl | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | `--shadow-xl` |
