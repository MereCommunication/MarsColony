// Milestone data module
import { gameState } from './gameState.js';
import { updateUpgradesList, updateBuildingsList } from './uiManager.js';

export const milestones = [
    // TIER 1 MILESTONES
    {
        id: 'first-outpost',
        name: 'First Outpost',
        description: 'Establish your first outpost on Mars',
        requirement: {
            minerals: 50
        },
        unlocked: false,
        tier: 1
    },
    {
        id: 'sustainable-energy',
        name: 'Sustainable Energy',
        description: 'Develop a sustainable energy network',
        requirement: {
            energy: 100
        },
        unlocked: false,
        tier: 1,
        onUnlock: () => {
            gameState.upgrades.find(u => u.id === 'solar-efficiency').unlocked = true;
            updateUpgradesList();
        }
    },
    {
        id: 'water-systems',
        name: 'Water Systems',
        description: 'Establish reliable water extraction',
        requirement: {
            water: 200
        },
        unlocked: false,
        tier: 1,
        onUnlock: () => {
            gameState.upgrades.find(u => u.id === 'water-drilling').unlocked = true;
            updateUpgradesList();
        }
    },
    
    // TIER 2 MILESTONES
    {
        id: 'electrical-infrastructure',
        name: 'Electrical Infrastructure',
        description: 'Develop advanced electrical systems for mining and production',
        requirement: {
            energy: 300,
            science: 100
        },
        unlocked: false,
        tier: 2,
        onUnlock: () => {
            gameState.buildings.find(b => b.id === 'electric-drill').unlocked = true;
            gameState.buildings.find(b => b.id === 'water-pump').unlocked = true;
            updateBuildingsList();
        }
    },
    {
        id: 'materials-processing',
        name: 'Materials Processing',
        description: 'Develop technology to process raw minerals into useful materials',
        requirement: {
            minerals: 500,
            science: 200
        },
        unlocked: false,
        tier: 2,
        onUnlock: () => {
            gameState.buildings.find(b => b.id === 'material-processor').unlocked = true;
            gameState.buildings.find(b => b.id === 'solar-array').unlocked = true;
            updateBuildingsList();
        }
    },
    {
        id: 'oxygen-production',
        name: 'Oxygen Production',
        description: 'Begin producing oxygen for life support',
        requirement: {
            water: 400,
            energy: 300,
            science: 250
        },
        unlocked: false,
        tier: 2,
        onUnlock: () => {
            gameState.buildings.find(b => b.id === 'oxygen-generator').unlocked = true;
            updateBuildingsList();
        }
    },
    {
        id: 'research-base',
        name: 'Research Base',
        description: 'Build a dedicated scientific research facility',
        requirement: {
            science: 300
        },
        unlocked: false,
        tier: 2,
        onUnlock: () => {
            gameState.buildings.find(b => b.id === 'research-lab').unlocked = true;
            gameState.upgrades.find(u => u.id === 'electric-drills').unlocked = true;
            updateBuildingsList();
            updateUpgradesList();
        }
    }
    
    // ... Add more milestones from the original file as needed
]; 