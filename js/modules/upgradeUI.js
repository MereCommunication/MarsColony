// Upgrade UI module
import { gameState } from './gameState.js';
import { formatNumber, playSound } from './uiUtils.js';
import { canAffordUpgrade } from './productionUtils.js';
import { updateResourcesDisplay } from './resourceUI.js';
import { updateBuildingsList } from './buildingUI.js';
import { updateStats } from './statsUI.js';

// Update upgrades list
export function updateUpgradesList() {
    const upgradesList = document.getElementById('upgrades-list');
    if (!upgradesList) return;
    
    upgradesList.innerHTML = '';
    
    let hasAvailableUpgrades = false;
    
    gameState.upgrades.forEach(upgrade => {
        if (!upgrade.unlocked || upgrade.purchased) return;
        
        hasAvailableUpgrades = true;
        const canAfford = canAffordUpgrade(upgrade);
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = `upgrade ${canAfford ? '' : 'disabled'}`;
        upgradeElement.dataset.id = upgrade.id;
        
        // Create upgrade info
        const infoElement = document.createElement('div');
        infoElement.className = 'upgrade-info';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'upgrade-name';
        nameElement.textContent = upgrade.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'upgrade-description';
        descElement.textContent = upgrade.description;
        
        infoElement.appendChild(nameElement);
        infoElement.appendChild(descElement);
        
        // Create cost container
        const costContainer = document.createElement('div');
        costContainer.className = 'upgrade-costs';
        
        // Add each cost
        for (const resourceType in upgrade.cost) {
            const cost = upgrade.cost[resourceType];
            const resource = gameState.resources[resourceType];
            
            const costElement = document.createElement('div');
            costElement.className = `upgrade-cost resource-${resourceType}`;
            costElement.innerHTML = `
                <i class="${resource.icon}"></i> ${formatNumber(cost)}
            `;
            
            if (resource.amount < cost) {
                costElement.classList.add('cannot-afford');
            }
            
            costContainer.appendChild(costElement);
        }
        
        // Assemble upgrade element
        upgradeElement.appendChild(infoElement);
        upgradeElement.appendChild(costContainer);
        
        // Add click handler
        upgradeElement.addEventListener('click', () => handleUpgradePurchase(upgrade));
        
        upgradesList.appendChild(upgradeElement);
    });
    
    // Show or hide the no upgrades message
    const noUpgradesMessage = document.getElementById('no-upgrades');
    if (noUpgradesMessage) {
        if (!hasAvailableUpgrades) {
            if (gameState.upgrades.some(u => u.purchased)) {
                noUpgradesMessage.textContent = 'All available upgrades purchased!';
            } else {
                noUpgradesMessage.textContent = 'No upgrades available yet';
            }
            noUpgradesMessage.style.display = 'block';
        } else {
            noUpgradesMessage.style.display = 'none';
        }
    }
}

// Handle upgrade purchase
function handleUpgradePurchase(upgrade) {
    if (!canAffordUpgrade(upgrade)) return;
    
    // Deduct costs
    for (const resourceType in upgrade.cost) {
        gameState.resources[resourceType].amount -= upgrade.cost[resourceType];
    }
    
    upgrade.purchased = true;
    
    // Apply upgrade effect
    upgrade.effect();
    
    // Play purchase sound
    playSound('purchase');
    
    // Update displays
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateStats();
} 