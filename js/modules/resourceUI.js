// Resource UI module
import { gameState } from './gameState.js';
import { formatNumber } from './uiUtils.js';
import { initTooltips } from './uiUtils.js';

// Update the resources display
export function updateResourcesDisplay() {
    const resourcesContainer = document.getElementById('resources-container');
    
    // If the container doesn't exist yet, create it
    if (!resourcesContainer || !resourcesContainer.children.length) {
        createResourcesDisplay();
        return;
    }
    
    // Update existing resource displays
    for (const resourceType in gameState.resources) {
        const resourceElement = document.querySelector(`.resource[data-resource="${resourceType}"]`);
        if (resourceElement) {
            const amountElement = resourceElement.querySelector('.resource-amount');
            const rateElement = resourceElement.querySelector('.resource-rate');
            
            if (amountElement) {
                amountElement.textContent = formatNumber(Math.floor(gameState.resources[resourceType].amount));
            }
            
            if (rateElement) {
                rateElement.textContent = formatNumber(gameState.resources[resourceType].perSecond.toFixed(1));
            }
        }
    }
}

// Create the initial resources display
function createResourcesDisplay() {
    const resourcesContainer = document.getElementById('resources-container');
    if (!resourcesContainer) return;
    
    resourcesContainer.innerHTML = '';
    
    for (const resourceType in gameState.resources) {
        const resource = gameState.resources[resourceType];
        
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource';
        resourceElement.dataset.resource = resourceType;
        
        resourceElement.innerHTML = `
            <div class="resource-icon"><i class="${resource.icon}"></i></div>
            <div class="resource-info">
                <div class="resource-name">${resource.name}</div>
                <div class="resource-value">
                    <span id="${resourceType}-amount" class="resource-amount">${formatNumber(Math.floor(resource.amount))}</span>
                    <span id="${resourceType}-per-second" class="resource-rate">(+${formatNumber(resource.perSecond.toFixed(1))})</span>
                </div>
            </div>
        `;
        
        resourcesContainer.appendChild(resourceElement);
    }
    
    // Re-initialize tooltips
    initTooltips();
} 