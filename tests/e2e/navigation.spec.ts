import { expect } from "@playwright/test";
import { test } from "./setup-test";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('verifie la redirection vers dashboard', async ({page}) => {
    await expect(page).toHaveURL('/dashboard');
});

test("verifie l'afichage de la sidebar et du breadcrumb", async ({page})=>{
    await expect(page.getByTestId('sidebar')).toBeVisible();
    await expect(page.getByTestId('breadcrumb')).toBeVisible();
})
test('verifie la navigation entre les différentes pages', async({page, context}) => {

    //Intercept Zone
    await context.route('**/api/carte', async (route) => {
        if (route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
  {
    "id": "zone_123",
    "nom": "Zone Paris 1",
    "polygone": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            2.35,
            48.85
          ],
          [
            2.36,
            48.85
          ],
          [
            2.36,
            48.86
          ],
          [
            2.35,
            48.86
          ],
          [
            2.35,
            48.85
          ]
        ]
      ]
    },
    "color": "#FF5733",
    "technicien_id": "tech_123",
    "technicien": {
      "id": "tech_123",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@example.com"
    }
  }
])
            });
        }
    })
    //Comptes
    await page.getByRole('button', { name: 'Comptes' }).click();
    await page.getByRole('link', { name: 'Liste des comptes' }).click();
    await expect(page).toHaveURL('/comptes');
    await expect(page.getByTestId('breadcrumb')).toContainText('comptes');

    await page.getByRole('link', { name: 'Créer un compte' }).click();
    await expect(page).toHaveURL('/comptes/create');
    await expect(page.getByTestId('breadcrumb')).toContainText('comptescreate');

    //Carte
    await page.getByRole('link', { name: 'Carte' }).click();
    await expect(page).toHaveURL('/carte');
    await expect(page.getByTestId('breadcrumb')).toContainText('carte');
});
