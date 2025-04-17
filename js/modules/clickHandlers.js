// Click handlers module
import { gameState } from './gameState.js';
import { playSound, createFloatingText } from './uiUtils.js';
import { updateResourcesDisplay } from './resourceUI.js';
import { updateBuildingsList } from './buildingUI.js';
import { updateUpgradesList } from './upgradeUI.js';
import { updateStats } from './statsUI.js';
import { checkMilestones } from './milestoneManager.js';

export function setupClickHandlers() {
    // Set up click handler for Mars button
    const marsButton = document.getElementById('mars');
    if (marsButton) {
        marsButton.addEventListener('click', handleMarsClick);
    }
}

// Handle clicking on Mars
function handleMarsClick(event) {
    // Add resources based on click power
    for (const resourceType in gameState.resourcesPerClick) {
        if (gameState.resourcesPerClick[resourceType] > 0) {
            gameState.resources[resourceType].amount += gameState.resourcesPerClick[resourceType];
            gameState.resources[resourceType].totalEarned += gameState.resourcesPerClick[resourceType];
            
            // Show floating text for the primary clicked resource (minerals)
            if (resourceType === 'minerals') {
                createFloatingText(event, `+${gameState.resourcesPerClick[resourceType]} ${gameState.resources[resourceType].name}`);
            }
        }
    }
    
    gameState.totalClicks++;
    
    // Play click sound
    playSound('click');
    
    // Update UI
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateStats();
    
    // Check for milestones
    checkMilestones();
} 