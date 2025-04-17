// Production utilities module
import { gameState } from './gameState.js';

// Helper function to adjust resource production rates
export function adjustBuildingProduction(building, resourceType, amount) {
    // This function should subtract the current contribution of this building
    // for this resource from the global production rate
    if (building.owned > 0) {
        gameState.resources[resourceType].perSecond -= building.owned * amount;
    }
}

// Generic function to apply production multiplier to a specific building and resource
export function applyProductionMultiplier(buildingId, resourceType, multiplier) {
    const building = gameState.buildings.find(b => b.id === buildingId);
    if (building && building.production[resourceType]) {
        const currentContribution = building.owned * building.production[resourceType];
        building.production[resourceType] *= multiplier;
        const newContribution = building.owned * building.production[resourceType];
        gameState.resources[resourceType].perSecond += (newContribution - currentContribution);
    }
}

// Generic function to apply production multiplier to all buildings that produce a specific resource
export function applyGlobalProductionMultiplier(resourceType, multiplier) {
    gameState.buildings.forEach(building => {
        if (building.production && building.production[resourceType]) {
            const currentContribution = building.owned * building.production[resourceType];
            building.production[resourceType] *= multiplier;
            const newContribution = building.owned * building.production[resourceType];
            gameState.resources[resourceType].perSecond += (newContribution - currentContribution);
        }
    });
}

// Calculate the cost of the next building
export function calculateBuildingCost(building, resourceType) {
    return Math.floor(building.cost[resourceType] * Math.pow(1.15, building.owned));
}

// Check if player can afford a building
export function canAffordBuilding(building) {
    // Check if we have enough resources to build
    for (const resourceId in building.cost) {
        const cost = calculateBuildingCost(building, resourceId);
        if (gameState.resources[resourceId].amount < cost) {
            return false;
        }
    }
    
    // Special check for buildings that consume oxygen
    if (building.consumption && building.consumption.oxygen) {
        const currentOxygenConsumption = getCurrentResourceConsumption('oxygen');
        const currentOxygenProduction = gameState.resources.oxygen.perSecond;
        const additionalConsumption = building.consumption.oxygen;
        
        // Check if new total consumption would exceed production
        if (currentOxygenConsumption + additionalConsumption > currentOxygenProduction) {
            return false;
        }
    }
    
    return true;
}

// Check if player can afford an upgrade
export function canAffordUpgrade(upgrade) {
    for (const resourceType in upgrade.cost) {
        if (gameState.resources[resourceType].amount < upgrade.cost[resourceType]) {
            return false;
        }
    }
    return true;
}

// Helper function to calculate current resource consumption
export function getCurrentResourceConsumption(resourceId) {
    let consumption = 0;
    gameState.buildings.forEach(building => {
        if (building.consumption && building.consumption[resourceId]) {
            consumption += building.consumption[resourceId] * building.owned;
        }
    });
    return consumption;
} 