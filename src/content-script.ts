const MIDDLE_BUTTON = 1;

/** The "Viewed" toggle control in a file header. */
const viewedToggleSelector = [
  // New (React) files view
  'button[aria-label="Viewed"]',
  'button[aria-label="Not Viewed"]',
  // Classic files view
  "input.js-reviewed-checkbox",
].join(", ");

/** A single file's container in the PR diff. */
const fileContainerSelector = [
  // New (React) files view
  '[class*="diffTargetable"]',
  // Classic files view
  ".js-file",
].join(", ");

/**
 * Middle-clicking these has its own meaning (ie, opening links in a new tab or
 * pasting on Linux), so we leave them alone.
 */
const ignoredTargetSelector = [
  "a[href]",
  "input",
  "textarea",
  "select",
  '[contenteditable]:not([contenteditable="false"])',
].join(", ");

/**
 * Find the "Viewed" toggle for the file containing the target. Containers can
 * be nested, so walk up until we find one that contains a toggle.
 */
function findViewedToggle(target: Element): HTMLElement | null {
  for (
    let container = target.closest(fileContainerSelector);
    container;
    container = container.parentElement?.closest(fileContainerSelector) ?? null
  ) {
    const toggle = container.querySelector<HTMLElement>(viewedToggleSelector);
    if (toggle) return toggle;
  }

  return null;
}

function getTargetToggle(event: MouseEvent): HTMLElement | null {
  if (event.button !== MIDDLE_BUTTON) return null;

  const target = event.target;
  if (!(target instanceof Element)) return null;
  if (target.closest(ignoredTargetSelector)) return null;

  const toggle = findViewedToggle(target);
  if (!toggle || toggle.matches(":disabled")) return null;

  return toggle;
}

// Prevent the browser's middle-click autoscroll from activating inside files
document.addEventListener(
  "mousedown",
  (event) => {
    if (getTargetToggle(event)) event.preventDefault();
  },
  {capture: true},
);

document.addEventListener(
  "auxclick",
  (event) => {
    const toggle = getTargetToggle(event);
    if (!toggle) return;

    event.preventDefault();
    toggle.click();
  },
  {capture: true},
);
