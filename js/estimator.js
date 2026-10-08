/* ==========================================================================
   VILLACRAFT BUILDERS - BUILDING MATERIAL ESTIMATOR TOOL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMaterialEstimator();
});

function initMaterialEstimator() {
  const sqftInput = document.getElementById('calc-sqft');
  const projectTypeSelect = document.getElementById('calc-project-type');
  const calcBtn = document.getElementById('btn-calculate');

  if (!sqftInput || !calcBtn) return;

  const resSand = document.getElementById('res-sand');
  const resCement = document.getElementById('res-cement');
  const resSteel = document.getElementById('res-steel');
  const resLaterite = document.getElementById('res-laterite');

  function calculateMaterials() {
    const sqft = parseFloat(sqftInput.value) || 0;
    const projectType = projectTypeSelect ? projectTypeSelect.value : 'villa';

    if (sqft <= 0) return;

    let multiplier = 1.0;
    if (projectType === 'commercial') multiplier = 1.15;
    if (projectType === 'grey') multiplier = 0.75;
    if (projectType === 'renovation') multiplier = 0.50;

    // Estimation Ratios per 1000 sq ft built-up area in North Goa construction:
    // Cement: ~400 bags per 1000 sqft
    // Steel: ~3.5 tons per 1000 sqft
    // Sand: ~18 brass per 1000 sqft
    // Laterite Stones: ~2200 blocks per 1000 sqft (for Goan masonry walls)

    const cementBags = Math.round((sqft / 1000) * 400 * multiplier);
    const steelTons = ((sqft / 1000) * 3.5 * multiplier).toFixed(1);
    const sandBrass = Math.round((sqft / 1000) * 18 * multiplier);
    const lateriteBlocks = Math.round((sqft / 1000) * 2200 * multiplier);

    if (resCement) resCement.textContent = `${cementBags.toLocaleString()} Bags`;
    if (resSteel) resSteel.textContent = `${steelTons} Tons`;
    if (resSand) resSand.textContent = `${sandBrass.toLocaleString()} Brass`;
    if (resLaterite) resLaterite.textContent = `${lateriteBlocks.toLocaleString()} Blocks`;
  }

  calcBtn.addEventListener('click', calculateMaterials);
  sqftInput.addEventListener('input', calculateMaterials);
  if (projectTypeSelect) projectTypeSelect.addEventListener('change', calculateMaterials);

  // Initial calculation
  calculateMaterials();
}
