import test, { expect } from "@playwright/test";

test('Vérifier la redirection si non connecté, la connexion et la déconnexion', async ({ page, context }) => {
  let isLoggedIn = false;

  
  await context.route('**/auth/signin', async (route) => {
    if (route.request().method() === 'POST') {
      isLoggedIn = true; // On passe en "connecté"
      await route.fulfill({
        status: 201,
        headers: {
          'Set-Cookie': 'token=fake.jwt.token; Path=/; HttpOnly; Secure; SameSite=Lax',
          'Content-Type': 'application/json',
        },
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    } else {
      await route.continue();
    }
  }, { times: 1 });
  await context.route('**/auth/logout', async (route) => {
    if (route.request().method() === 'POST') {
      isLoggedIn = false; // On passe en "déconnecté"
      await route.fulfill({
        status: 200,
        headers: {
          'Set-Cookie': 'token=fake.jwt.token; Path=/; HttpOnly; Secure; SameSite=Lax',
          'Content-Type': 'application/json',
        },
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    } else {
      await route.continue();
    }
  });

  
  await context.route('**/auth/me', async (route) => {
    if (route.request().method() === 'GET') {
      if (isLoggedIn) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            "id": "12345",
            "email": "jane.doe@example.com",
            "nom": "Doe",
            "prenom": "Jane",
            "telephone": "+33601020304",
            "role": "TECHNICIEN"
            })
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Unauthorized' })
        });
      }
    } else {
      await route.continue();
    }
  });

  
  await page.goto('/');
  await expect(page.getByText('Connectez vous')).toBeVisible();

  
  await page.getByRole('textbox', { name: 'E-mail' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('password');

  
  await Promise.all([
    page.waitForResponse(r => r.url().includes('/auth/signin') && r.request().method() === 'POST'),
    page.waitForResponse(r => r.url().includes('/auth/me') && r.request().method() === 'GET'),
    page.getByRole('button', { name: 'Connexion' }).click(),
  ]);

  await expect(page).toHaveURL('/dashboard');
  await page.getByRole('button', { name: 'Jane.Doe' }).click()
  await Promise.all([
    page.waitForResponse(r => r.url().includes('/auth/logout') && r.request().method() === 'POST'),
    page.getByRole('menuitem', { name: 'Déconnexion' }).click()
  ]);
    await expect(page.getByText('Connectez vous')).toBeVisible();

});

test('vérifier le cas si un user ce connecte avec le mauvais email/mdp', async ({ page, context }) => {
  await context.route('**/auth/signin', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized', message: 'Identifiants invalides' })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('/');
  await expect(page.getByText('Connectez vous')).toBeVisible();

  await page.getByRole('textbox', { name: 'E-mail' }).fill('wrong@example.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('wrongpassword');

  await Promise.all([
    page.waitForResponse(r => r.url().includes('/auth/signin') && r.request().method() === 'POST'),
    page.getByRole('button', { name: 'Connexion' }).click(),
  ]);

  await expect(page.getByText('Identifiants invalides')).toBeVisible();
});

