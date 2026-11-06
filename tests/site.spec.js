const { test, expect } = require('@playwright/test');

for (const width of [320, 390, 600, 680, 720, 768, 1440]) {
  test(`layout stays readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const layout = await page.evaluate(() => {
      const bounds = selector => document.querySelector(selector).getBoundingClientRect();
      const copy = bounds('.hero-copy');
      const visual = bounds('.hero-visual');
      const caption = bounds('.stat-caption');
      const stats = bounds('.stat-line');
      const sectionGaps = [...document.querySelectorAll('section[id]')].map(section =>
        section.querySelector('h2').getBoundingClientRect().top - section.getBoundingClientRect().top
      );
      const overflowing = [...document.querySelectorAll('main *, footer *')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
      }).map(el => el.tagName + '.' + el.className);
      return {
        overflowing, sectionGaps,
        stacked: visual.top >= copy.bottom,
        captionGap: stats.top - caption.bottom,
        columns: getComputedStyle(document.querySelector('.impact-grid')).gridTemplateColumns.split(' ').length
      };
    });

    expect(layout.overflowing).toEqual([]);
    expect(layout.stacked).toBe(width <= 720);
    expect(layout.columns).toBe(width <= 600 ? 1 : width <= 720 ? 2 : 3);
    expect(layout.captionGap).toBeGreaterThanOrEqual(8);
    for (const gap of layout.sectionGaps) {
      expect(gap).toBeCloseTo((width <= 600 ? 26 : 34) + 1, 0);
    }
  });
}

test('local assets and fragment links resolve', async ({ page, request }) => {
  await page.goto('/');
  const missingFragments = await page.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute('href').slice(1)).filter(id => !document.getElementById(id))
  );
  expect(missingFragments).toEqual([]);

  const assets = await page.evaluate(() => {
    const urls = [...document.querySelectorAll('[src], link[href]')].flatMap(el =>
      [el.getAttribute('src'), el.getAttribute('href')].filter(Boolean)
    );
    const css = [...document.styleSheets].filter(sheet => sheet.href?.startsWith(location.origin));
    for (const sheet of css) {
      const visit = rules => {
        for (const rule of rules) {
          if (rule.cssRules) visit(rule.cssRules);
          if (rule.style) {
            for (const match of rule.style.cssText.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
              urls.push(new URL(match[1], sheet.href).href);
            }
          }
        }
      };
      visit(sheet.cssRules);
    }
    return [...new Set(urls.map(url => new URL(url, location.href).href))]
      .filter(url => url.startsWith(location.origin));
  });
  for (const url of assets) {
    const response = await request.get(url);
    expect(response.ok(), url).toBeTruthy();
    if (url.includes('.webmanifest')) {
      const manifest = await response.json();
      for (const icon of manifest.icons) {
        const iconURL = new URL(icon.src, url).href;
        expect((await request.get(iconURL)).ok(), iconURL).toBeTruthy();
      }
    }
  }
});

test('theme follows the system and persists an explicit choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'false');
});

test('mobile navigation opens, closes with Escape, and follows links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Experience' }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('print layout hides controls and keeps consistent section spacing', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('header.nav')).toBeHidden();
  await expect(page.locator('.hero-visual')).toBeHidden();
  const spacing = await page.locator('#experience').evaluate(el => getComputedStyle(el).paddingTop);
  expect(spacing).toBe('24px');
});
