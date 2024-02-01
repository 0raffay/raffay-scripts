class rfTabbing {
  constructor({
    button = 'rf-tabbing-button',
    target = 'rf-tabbing-target',
    groupBy = 'rf-tabbing-group-by',
    nothingOnActive = false,
    initialHide = false,
    initialHideAll = false,
  }, onHide) {

    this.buttons = [...document.querySelectorAll(`[${button}]`)];
    this.targets = this.setTargets(target, groupBy);

    this.initialHide = initialHide;
    this.initialHideAll = initialHideAll;
    this.nothingOnActive = nothingOnActive;

  }

  setTargets(targetSelector, groupBy) {
    const targets = [];
    document.querySelectorAll(`[${targetSelector}]`).forEach(t => {
      this.targets.push({ target: t, group: t.getAttribute(groupBy) ? t.getAttribute(groupBy) : null })
    })
    return targets;
  }
}