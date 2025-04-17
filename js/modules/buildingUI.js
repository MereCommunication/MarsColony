// Building UI module
import { gameState } from './gameState.js';
import { formatNumber, formatCategoryName, playSound } from './uiUtils.js';
import { canAffordBuilding, calculateBuildingCost } from './productionUtils.js';
import { updateResourcesDisplay } from './resourceUI.js';
import { updateUpgradesList } from './upgradeUI.js';
import { updateStats } from './statsUI.js';

// Update building list display
export function updateBuildingsList() {
    const buildingsList = document.getElementById('buildings-list');
    if (!buildingsList) return;
    
    buildingsList.innerHTML = '';
    
    // Group buildings by category
    const buildingCategories = {};
    gameState.buildings.forEach(building => {
        if (!building.unlocked) return;
        
        if (!buildingCategories[building.category]) {
            buildingCategories[building.category] = [];
        }
        
        buildingCategories[building.category].push(building);
    });
    
    // Create category sections
    for (const category in buildingCategories) {
        // Create category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'building-category-header';
        categoryHeader.textContent = formatCategoryName(category);
        buildingsList.appendChild(categoryHeader);
        
        // Add buildings in this category
        buildingCategories[category].forEach(building => {
            const canAfford = canAffordBuilding(building);
            
            const buildingElement = document.createElement('div');
            buildingElement.className = `building ${canAfford ? '' : 'disabled'}`;
            buildingElement.dataset.id = building.id;
            
            // Create owned display
            const ownedElement = document.createElement('div');
            ownedElement.className = 'building-owned';
            ownedElement.textContent = building.owned;
            
            // Create building info
            const infoElement = document.createElement('div');
            infoElement.className = 'building-info';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'building-name';
            nameElement.textContent = building.name;
            
            const descElement = document.createElement('div');
            descElement.className = 'building-description';
            descElement.textContent = building.description;
            
            // Create production info
            const productionElement = document.createElement('div');
            productionElement.className = 'building-production';
            
            let productionHtml = 'Produces: ';
            for (const resourceType in building.production) {
                if (building.production[resourceType] > 0) {
                    productionHtml += `<span class="resource-${resourceType}">+${formatNumber(building.production[resourceType].toFixed(1))} ${gameState.resources[resourceType].name}</span> `;
                }
            }
            productionElement.innerHTML = productionHtml;
            
            // Add consumption info if applicable
            if (building.consumption) {
                const consumptionElement = document.createElement('div');
                consumptionElement.className = 'building-consumption';
                
                let consumptionHtml = 'Consumes: ';
                for (const resourceType in building.consumption) {
                    if (building.consumption[resourceType] > 0) {
                        consumptionHtml += `<span class="resource-${resourceType}">-${formatNumber(building.consumption[resourceType].toFixed(1))} ${gameState.resources[resourceType].name}</span> `;
                    }
                }
                consumptionElement.innerHTML = consumptionHtml;
                
                // Append consumption info
                infoElement.appendChild(consumptionElement);
            }
            
            // Append building info elements
            infoElement.appendChild(nameElement);
            infoElement.appendChild(descElement);
            infoElement.appendChild(productionElement);
            
            // Create cost container
            const costContainer = document.createElement('div');
            costContainer.className = 'building-costs';
            
            // Add each cost
            for (const resourceType in building.cost) {
                const cost = calculateBuildingCost(building, resourceType);
                const resource = gameState.resources[resourceType];
                
                const costElement = document.createElement('div');
                costElement.className = `building-cost resource-${resourceType}`;
                costElement.innerHTML = `
                    <i class="${resource.icon}"></i> ${formatNumber(Math.floor(cost))}
                `;
                
                if (resource.amount < cost) {
                    costElement.classList.add('cannot-afford');
                }
                
                costContainer.appendChild(costElement);
            }
            
            // Assemble building element
            buildingElement.appendChild(ownedElement);
            buildingElement.appendChild(infoElement);
            buildingElement.appendChild(costContainer);
            
            // Add click handler
            buildingElement.addEventListener('click', () => handleBuildingPurchase(building));
            
            buildingsList.appendChild(buildingElement);
        });
    }
}

// Function to handle building purchases
function handleBuildingPurchase(building) {
    if (!canAffordBuilding(building)) return;
    
    // Deduct costs
    for (const resourceType in building.cost) {
        const cost = calculateBuildingCost(building, resourceType);
        gameState.resources[resourceType].amount -= cost;
    }
    
    // Increase building count
    building.owned++;
    
    // Increase production rates
    for (const resourceType in building.production) {
        if (!gameState.resources[resourceType]) continue;
        gameState.resources[resourceType].perSecond += building.production[resourceType];
    }
    
    // Add consumption info to display
    if (building.consumption) {
        // Don't modify perSecond, as consumption is handled separately in the game loop
        // But we could update the UI to show consumption rates
    }
    
    // Play purchase sound
    playSound('purchase');
    
    // Update displays
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateStats();
}

// Function to refresh buildings UI (for affordability)
export function refreshBuildings() {
    const buildingElements = document.querySelectorAll('.building');
    
    buildingElements.forEach(element => {
        const buildingId = element.dataset.id;
        const building = gameState.buildings.find(b => b.id === buildingId);
        
        if (building) {
            const canAfford = canAffordBuilding(building);
            
            if (canAfford) {
                element.classList.remove('disabled');
            } else {
                element.classList.add('disabled');
            }
            
            // Update cost elements
            const costElements = element.querySelectorAll('.building-cost');
            
            costElements.forEach(costElement => {
                const resourceClass = Array.from(costElement.classList)
                    .find(cls => cls.startsWith('resource-'));
                
                if (resourceClass) {
                    const resourceType = resourceClass.replace('resource-', '');
                    const cost = calculateBuildingCost(building, resourceType);
                    
                    if (gameState.resources[resourceType].amount < cost) {
                        costElement.classList.add('cannot-afford');
                    } else {
                        costElement.classList.remove('cannot-afford');
                    }
                }
            });
        }
    });
} 