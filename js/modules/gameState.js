// Game state module
export let gameState = {
    resources: {
        minerals: {
            name: "Minerals",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "Basic raw materials extracted from Martian soil",
            icon: "fas fa-mountain"
        },
        water: {
            name: "Water",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "H₂O extracted from ice deposits or synthesized",
            icon: "fas fa-tint"
        },
        energy: {
            name: "Energy",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "Power generated from solar panels and other sources",
            icon: "fas fa-bolt"
        },
        food: {
            name: "Food",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "Nutrients produced in greenhouses and hydroponics",
            icon: "fas fa-seedling"
        },
        science: {
            name: "Science",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "Research points used to unlock new technologies",
            icon: "fas fa-flask"
        },
        oxygen: {
            name: "Oxygen",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "O₂ produced through electrolysis and plant photosynthesis",
            icon: "fas fa-wind"
        },
        materials: {
            name: "Advanced Materials",
            amount: 0,
            perSecond: 0,
            totalEarned: 0,
            description: "Processed materials used in advanced construction",
            icon: "fas fa-cubes"
        }
    },
    resourcesPerClick: {
        minerals: 1,
        water: 0,
        energy: 0,
        food: 0,
        science: 0,
        oxygen: 0,
        materials: 0
    },
    totalClicks: 0,
    lastSaved: Date.now(),
    buildings: [], // Will be populated in initState
    upgrades: [],  // Will be populated in initState
    milestones: [] // Will be populated in initState
};

// Initialize game state with default values
export function initState() {
    // Reset the basic properties
    gameState.totalClicks = 0;
    gameState.lastSaved = Date.now();
    
    // Reset resource values
    for (const resourceId in gameState.resources) {
        gameState.resources[resourceId].amount = 0;
        gameState.resources[resourceId].perSecond = 0;
        gameState.resources[resourceId].totalEarned = 0;
    }
    
    // Initialize buildings array
    initBuildings();
    
    // Initialize upgrades array
    initUpgrades();
    
    // Initialize milestones array
    initMilestones();
}

// Import complete building, upgrade, and milestone definitions
import { buildings } from './buildingData.js';
import { upgrades } from './upgradeData.js';
import { milestones } from './milestoneData.js';

function initBuildings() {
    gameState.buildings = buildings;
}

function initUpgrades() {
    gameState.upgrades = upgrades;
}

function initMilestones() {
    gameState.milestones = milestones;
} 