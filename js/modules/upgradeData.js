// Upgrade data module
import { gameState } from './gameState.js';
import { applyProductionMultiplier, applyGlobalProductionMultiplier } from './productionUtils.js';

export const upgrades = [
    // TIER 1 UPGRADES
    {
        id: 'improved-tools',
        name: 'Improved Tools',
        description: 'Double mineral collection when clicking',
        cost: {
            minerals: 50,
            science: 10
        },
        purchased: false,
        unlocked: true,
        tier: 1,
        effect: () => {
            gameState.resourcesPerClick.minerals *= 2;
        }
    },
    {
        id: 'efficient-extractors',
        name: 'Efficient Extractors',
        description: 'Mineral extractors produce 100% more minerals',
        cost: {
            minerals: 200,
            energy: 50,
            science: 30
        },
        purchased: false,
        unlocked: true,
        tier: 1,
        effect: () => {
            const building = gameState.buildings.find(b => b.id === 'mineral-extractor');
            if (building && building.production.minerals) {
                // Calculate current contribution to the production rate
                const currentContribution = building.owned * building.production.minerals;
                
                // Double the production value
                building.production.minerals *= 2;
                
                // Add the new contribution
                const newContribution = building.owned * building.production.minerals;
                
                // Update the global production rate directly 
                gameState.resources.minerals.perSecond += (newContribution - currentContribution);
            }
        }
    },
    
    // TIER 2 UPGRADES
    {
        id: 'solar-efficiency',
        name: 'Solar Panel Efficiency',
        description: 'Solar panels produce 100% more energy',
        cost: {
            minerals: 300,
            science: 100
        },
        purchased: false,
        unlocked: false,
        tier: 2,
        effect: () => {
            const building = gameState.buildings.find(b => b.id === 'solar-panel');
            if (building && building.production.energy) {
                const currentContribution = building.owned * building.production.energy;
                building.production.energy *= 2;
                const newContribution = building.owned * building.production.energy;
                gameState.resources.energy.perSecond += (newContribution - currentContribution);
            }
        }
    },
    {
        id: 'water-drilling',
        name: 'Advanced Water Drilling',
        description: 'Water extractors produce 150% more water',
        cost: {
            minerals: 500,
            energy: 200,
            science: 150
        },
        purchased: false,
        unlocked: false,
        tier: 2,
        effect: () => {
            const building = gameState.buildings.find(b => b.id === 'water-extractor');
            if (building && building.production.water) {
                const currentContribution = building.owned * building.production.water;
                building.production.water *= 2.5;
                const newContribution = building.owned * building.production.water;
                gameState.resources.water.perSecond += (newContribution - currentContribution);
            }
        }
    },
    {
        id: 'electric-drills',
        name: 'Electric Drill Efficiency',
        description: 'Electric Mineral Drills produce 100% more minerals',
        cost: {
            minerals: 600,
            energy: 250,
            science: 200
        },
        purchased: false,
        unlocked: false,
        tier: 2,
        effect: () => {
            const building = gameState.buildings.find(b => b.id === 'electric-drill');
            if (building && building.production.minerals) {
                const currentContribution = building.owned * building.production.minerals;
                building.production.minerals *= 2;
                const newContribution = building.owned * building.production.minerals;
                gameState.resources.minerals.perSecond += (newContribution - currentContribution);
            }
        }
    },
    
    // TIER 3 UPGRADES
    {
        id: 'hydroponics',
        name: 'Advanced Hydroponics',
        description: 'All food production increased by 50%',
        cost: {
            minerals: 800,
            materials: 100,
            water: 400,
            energy: 300,
            science: 300
        },
        purchased: false,
        unlocked: false,
        tier: 3,
        effect: () => {
            applyGlobalProductionMultiplier('food', 1.5);
        }
    },
    {
        id: 'material-science',
        name: 'Advanced Material Science',
        description: 'Material Processors produce 100% more Advanced Materials',
        cost: {
            minerals: 700,
            energy: 300,
            science: 350
        },
        purchased: false,
        unlocked: false,
        tier: 3,
        effect: () => {
            applyProductionMultiplier('material-processor', 'materials', 2);
        }
    },
    {
        id: 'oxygen-systems',
        name: 'Oxygen System Efficiency',
        description: 'All oxygen production increased by 50%',
        cost: {
            minerals: 850,
            materials: 150,
            energy: 400,
            science: 400
        },
        purchased: false,
        unlocked: false,
        tier: 3,
        effect: () => {
            applyGlobalProductionMultiplier('oxygen', 1.5);
        }
    }
    
    // ... Add more upgrades from the original file as needed
]; 