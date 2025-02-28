import { test, expect } from '@playwright/test';

test('display month revenue metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('Receita total (mês)')).toBeVisible();
    await expect(page.getByText('R$ 200,00')).toBeVisible();
    await expect(page.getByText('+10% em relação ao mês passado')).toBeVisible();
});

test('display month orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('Pedidos (mês)')).toBeVisible();
    await expect(page.getByText('200', { exact: true })).toBeVisible();
    await expect(page.getByText('+7% em relação ao mês passado')).toBeVisible();
});

test('display day orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('Pedidos (dia)')).toBeVisible();
    await expect(page.getByText('20', { exact: true })).toBeVisible();
    await expect(page.getByText('-5% em relação a ontem')).toBeVisible();
});

test('display month canceled orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('Cancelamentos (mês)')).toBeVisible();
    await expect(page.getByText('5', { exact: true })).toBeVisible();
    await expect(page.getByText('-5% em relação ao mês passado')).toBeVisible();
});