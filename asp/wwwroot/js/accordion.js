/* Accordion acessível (padrão WAI-ARIA APG): um painel aberto por vez, o primeiro abre por padrão
   e sempre há um aberto — por isso o item aberto recebe aria-disabled="true". */
(() => {
  const initAccordion = (root) => {
    const triggers = Array.from(root.querySelectorAll("[data-accordion-trigger]"));
    if (!triggers.length) return;

    const setOpen = (active) => {
      triggers.forEach((trigger) => {
        const isActive = trigger === active;
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        trigger.setAttribute("aria-expanded", String(isActive));
        trigger.setAttribute("aria-disabled", String(isActive));
        trigger.closest(".accordion__item").classList.toggle("accordion__item--open", isActive);
        if (panel) panel.hidden = !isActive;
      });
    };

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => {
        if (trigger.getAttribute("aria-expanded") !== "true") setOpen(trigger);
      });

      trigger.addEventListener("keydown", (event) => {
        const last = triggers.length - 1;
        const targets = {
          ArrowDown: index === last ? 0 : index + 1,
          ArrowUp: index === 0 ? last : index - 1,
          Home: 0,
          End: last,
        };
        if (event.key in targets) {
          event.preventDefault();
          triggers[targets[event.key]].focus();
        }
      });
    });

    setOpen(triggers.find((t) => t.getAttribute("aria-expanded") === "true") || triggers[0]);
  };

  document.querySelectorAll("[data-accordion]").forEach(initAccordion);
})();
