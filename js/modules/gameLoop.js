// Game loop module
import { gameState } from './gameState.js';
import { formatNumber } from './uiUtils.js';
import { refreshBuildings } from './buildingUI.js';

let lastUpdate = Date.now();

// Initialize game loop
export function initGameLoop() {
    // Start game loop
    setInterval(gameLoop, 1000);
    
    // Start autosave
    setInterval(() => {
        const saveEvent = new CustomEvent('saveGame');
        document.dispatchEvent(saveEvent);
    }, 30000); // Save every 30 seconds
}

// Main game loop
function gameLoop() {
    const now = Date.now();
    const delta = now - lastUpdate;
    
    updateResources(delta);
    
    lastUpdate = now;
    requestAnimationFrame(gameLoop);
}

// Update resources based on time delta
function updateResources(delta) {
    // Calculate consumption first
    const consumptionRates = {};
    
    // Initialize consumption rates for all resources
    for (const resourceId in gameState.resources) {
        consumptionRates[resourceId] = 0;
    }
    
    // Calculate consumption from buildings
    gameState.buildings.forEach(building => {
        if (building.consumption && building.owned > 0) {
            for (const resourceId in building.consumption) {
                consumptionRates[resourceId] += building.consumption[resourceId] * building.owned;
            }
        }
    });
    
    // Update resources - add production and subtract consumption
    for (const resourceId in gameState.resources) {
        const resource = gameState.resources[resourceId];
        
        // Add production
        resource.amount += resource.perSecond * (delta / 1000);
        
        // Subtract consumption
        const consumption = consumptionRates[resourceId];
        if (consumption > 0) {
            resource.amount -= consumption * (delta / 1000);
            
            // Prevent resources from going below 0
            if (resource.amount < 0) {
                resource.amount = 0;
                
                // TODO: Handle critical resource shortage (e.g., oxygen)
                // Could trigger warnings or penalties
            }
        }
        
        // Update UI
        const amountElement = document.getElementById(`${resourceId}-amount`);
        const perSecondElement = document.getElementById(`${resourceId}-per-second`);
        
        if (amountElement) {
            amountElement.textContent = formatNumber(resource.amount);
        }
        
        if (perSecondElement) {
            perSecondElement.textContent = formatNumber(resource.perSecond - consumption) + '/s';
        }
    }
    
    // Refresh building buttons
    refreshBuildings();
} 