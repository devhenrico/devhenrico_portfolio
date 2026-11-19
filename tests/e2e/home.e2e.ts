import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('hasSeenIntro', 'true');
  });
});

test.describe('portfolio landing page', () => {
  test('loads the main sections and project cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('devhenrico').first()).toBeVisible();
    await expect(page.getByText('Henrico da Silva Santos')).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Ver Projetos/i }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Projetos em destaque/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Abrir projeto DaGym' }),
    ).toHaveAttribute('href', 'https://dagym.vercel.app/');
    await expect(page.getByText('StreamPlay')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Abrir projeto Download YouTube' }),
    ).toHaveAttribute('href', 'https://github.com/devhenrico/download-youtube');
    await expect(
      page.getByRole('link', { name: 'Abrir projeto Clínica Construindo Saberes' }),
    ).toHaveAttribute('href', 'https://clinicaconstruindosaberes.com.br/');

    await expect(
      page.getByRole('heading', { name: 'Tecnologias' }),
    ).toBeVisible();
    await expect(page.getByText('Frontend', { exact: true })).toBeVisible();
    await expect(page.getByText('Backend', { exact: true })).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Vamos conversar/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Nome')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'E-mail' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Mensagem' })).toBeVisible();
  });
});
