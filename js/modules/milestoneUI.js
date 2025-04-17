// Milestone UI module
import { gameState } from './gameState.js';
import { formatNumber } from './uiUtils.js';

// Update milestones list
export function updateMilestonesList() {
    const milestonesList = document.getElementById('milestones-list');
    if (!milestonesList) return;
    
    milestonesList.innerHTML = '';
    
    gameState.milestones.forEach(milestone => {
        const milestoneElement = document.createElement('div');
        milestoneElement.className = `milestone ${milestone.unlocked ? 'unlocked' : 'locked'}`;
        
        // Create milestone icon
        const iconElement = document.createElement('div');
        iconElement.className = 'milestone-icon';
        iconElement.innerHTML = milestone.unlocked ? '✅' : '🔒';
        
        // Create milestone info
        const infoElement = document.createElement('div');
        infoElement.className = 'milestone-info';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'milestone-name';
        nameElement.textContent = milestone.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'milestone-description';
        descElement.textContent = milestone.description;
        
        infoElement.appendChild(nameElement);
        infoElement.appendChild(descElement);
        
        // Add requirements if not unlocked
        if (!milestone.unlocked) {
            const reqsContainer = document.createElement('div');
            reqsContainer.className = 'milestone-requirements';
            
            let reqsHtml = '<div class="milestone-progress">Requirements: ';
            for (const resourceType in milestone.requirement) {
                const current = gameState.resources[resourceType].totalEarned;
                const required = milestone.requirement[resourceType];
                const percent = Math.min(100, Math.floor((current / required) * 100));
                
                reqsHtml += `<div class="resource-req">
                    <i class="${gameState.resources[resourceType].icon}"></i> 
                    ${formatNumber(Math.floor(current))}/${formatNumber(required)} 
                    (${percent}%)
                </div>`;
            }
            reqsHtml += '</div>';
            
            reqsContainer.innerHTML = reqsHtml;
            infoElement.appendChild(reqsContainer);
        }
        
        // Assemble milestone element
        milestoneElement.appendChild(iconElement);
        milestoneElement.appendChild(infoElement);
        
        milestonesList.appendChild(milestoneElement);
    });
} 