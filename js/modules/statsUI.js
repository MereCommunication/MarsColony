// Stats UI module
import { gameState } from './gameState.js';
import { formatNumber } from './uiUtils.js';

// Update stats display
export function updateStats() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;
    
    statsContainer.innerHTML = `
        <div class="stat">Total Clicks: ${formatNumber(gameState.totalClicks)}</div>
        <div class="stat">Buildings Owned: ${gameState.buildings.reduce((sum, b) => sum + b.owned, 0)}</div>
        <div class="stat-header">Total Resources Collected:</div>
        ${Object.keys(gameState.resources).map(type => 
            `<div class="stat"><i class="${gameState.resources[type].icon}"></i> ${gameState.resources[type].name}: ${formatNumber(Math.floor(gameState.resources[type].totalEarned))}</div>`
        ).join('')}
    `;
} 