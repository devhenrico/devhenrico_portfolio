import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('hasSeenIntro', 'true');
  });
});

test.describe('portfolio navigation', () => {
  test('uses the desktop navigation to move between landing sections', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Projetos' })
      .click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole('heading', { name: /Projetos em destaque/i }),
    ).toBeVisible();

    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Tecnologias' })
      .click();
    await expect(page).toHaveURL(/\/technologies$/);
    await expect(
      page.getByRole('heading', { name: 'Tecnologias' }),
    ).toBeVisible();

    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Contato' })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole('heading', { name: /Vamos conversar/i }),
    ).toBeVisible();
  });

  test('opens the about page and toggles the mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/about');

    await expect(
      page.getByRole('heading', {
        name: /Conheça o seu Desenvolvedor Frontend/i,
      }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Toggle menu' }).click();

    await expect(page.getByRole('link', { name: 'Início' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projetos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contato' })).toBeVisible();
  });

  test('uses the pre-footer CTA to jump to the contact section', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Começar agora/i }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole('heading', { name: /Vamos conversar/i }),
    ).toBeVisible();
  });

  test('shows curriculum actions from the hero', async ({ page }) => {
    await page.goto('/');

    await page.getByText(/Baixar Currículo/i).click();

    await expect(page.getByText('Baixar CV')).toBeVisible();
    await expect(page.getByText('Abrir CV')).toBeVisible();
  });

  test('copies the contact email from the contact card', async ({
    context,
    page,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    await page.getByRole('button', { name: /Copiar Email/i }).click();

    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe('henricosantos27@outlook.com');
  });
});
