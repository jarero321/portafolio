import { test } from '@playwright/test';

const SCREENSHOT_DIR = 'public/screenshots';

async function typeCommand(page: import('@playwright/test').Page, command: string) {
  const input = page.locator('.terminal-input');
  await input.fill(command);
  await input.press('Enter');

  // Wait for processing to complete (thinking indicator disappears + input re-enables)
  await page.locator('.thinking-indicator').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  await page.locator('.thinking-indicator').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});

  // Extra wait for typing animation on long outputs
  await page.waitForTimeout(1500);
}

test('capture terminal screenshots', async ({ page }) => {
  await page.goto('/en');

  // Wait for terminal to be ready
  await page.locator('.terminal-input').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Screenshot 1: Hero view with welcome message
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/terminal-hero.png`,
    fullPage: false,
  });

  // Screenshot 2: help command
  await typeCommand(page, 'help');
  await page.locator('.terminal-container').screenshot({
    path: `${SCREENSHOT_DIR}/terminal-help.png`,
  });

  // Screenshot 3: about command
  await typeCommand(page, 'about');
  await page.locator('.terminal-container').screenshot({
    path: `${SCREENSHOT_DIR}/terminal-about.png`,
  });

  // Screenshot 4: skills command
  await typeCommand(page, 'skills');
  await page.locator('.terminal-container').screenshot({
    path: `${SCREENSHOT_DIR}/terminal-skills.png`,
  });

  // Screenshot 5: projects --featured
  await typeCommand(page, 'projects --featured');
  await page.locator('.terminal-container').screenshot({
    path: `${SCREENSHOT_DIR}/terminal-projects.png`,
  });
});
