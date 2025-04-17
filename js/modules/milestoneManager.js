// Milestone manager module
import { gameState } from './gameState.js';
import { playSound, showNotification } from './uiUtils.js';
import { updateMilestonesList } from './milestoneUI.js';
import { updateBuildingsList, updateUpgradesList } from './uiManager.js';

// Check if any milestones have been achieved
export function checkMilestones() {
    let milestoneUnlocked = false;
    
    gameState.milestones.forEach(milestone => {
        if (milestone.unlocked) return;
        
        // Check if all requirements are met
        let requirementsMet = true;
        for (const resourceType in milestone.requirement) {
            if (gameState.resources[resourceType].totalEarned < milestone.requirement[resourceType]) {
                requirementsMet = false;
                break;
            }
        }
        
        if (requirementsMet) {
            milestone.unlocked = true;
            milestoneUnlocked = true;
            
            // Play milestone sound
            playSound('milestone');
            
            // Show notification
            showNotification(`Milestone Achieved: ${milestone.name}!`);
            
            // Call the onUnlock function if it exists
            if (milestone.onUnlock) {
                milestone.onUnlock();
            }
        }
    });
    
    if (milestoneUnlocked) {
        updateMilestonesList();
    }
} 