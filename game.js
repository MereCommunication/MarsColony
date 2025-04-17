// Game state
const gameState = {
    resources: {
        minerals: 50,
        water: 30,
        energy: 20,
        food: 10,
        oxygen: 5,
        materials: 0,
        science: 0
    },
    resourceRates: {
        minerals: 0,
        water: 0,
        energy: 0,
        food: 0,
        oxygen: 0,
        materials: 0,
        science: 0
    },
    buildings: {
        'mineral-extractor': 0,
        'water-extractor': 0,
        'solar-panel': 0,
        'hydroponics-farm': 0,
        'oxygen-generator': 0,
        'materials-factory': 0,
        'research-lab': 0
    },
    upgrades: {
        'improved-tools': false,
        'efficient-extractors': false,
        'advanced-hydroponics': false,
        'solar-efficiency': false,
        'recycling-system': false,
        'advanced-research': false
    },
    milestones: {
        'first-steps': false,
        'self-sufficient': false,
        'research-begins': false,
        'expanding-base': false,
        'thriving-colony': false
    },
    stats: {
        clicks: 0,
        buildingsBuilt: 0,
        upgradesResearched: 0,
        resourcesProduced: 0,
        daysSurvived: 1
    },
    settings: {
        soundEnabled: true,
        notificationsEnabled: true
    },
    gameStartTime: Date.now(),
    lastUpdateTime: Date.now(),
    lastSaveTime: Date.now()
};

// Building definitions
const buildings = {
    'mineral-extractor': {
        name: 'Mineral Extractor',
        description: 'Extracts minerals from Martian soil',
        baseCost: { minerals: 20 },
        costMultiplier: 1.5,
        production: { minerals: 1 },
        consumption: { energy: 1 }
    },
    'water-extractor': {
        name: 'Water Extractor',
        description: 'Extracts water from the Martian subsurface',
        baseCost: { minerals: 30, energy: 10 },
        costMultiplier: 1.5,
        production: { water: 1 },
        consumption: { energy: 2 }
    },
    'solar-panel': {
        name: 'Solar Panel',
        description: 'Generates electricity from sunlight',
        baseCost: { minerals: 25 },
        costMultiplier: 1.4,
        production: { energy: 2 },
        consumption: {}
    },
    'hydroponics-farm': {
        name: 'Hydroponics Farm',
        description: 'Grows food using water and energy',
        baseCost: { minerals: 40, water: 20, energy: 10 },
        costMultiplier: 1.6,
        production: { food: 1 },
        consumption: { water: 1, energy: 1 }
    },
    'oxygen-generator': {
        name: 'Oxygen Generator',
        description: 'Generates oxygen from water',
        baseCost: { minerals: 50, water: 20, energy: 20 },
        costMultiplier: 1.6,
        production: { oxygen: 1 },
        consumption: { water: 1, energy: 2 }
    },
    'materials-factory': {
        name: 'Materials Factory',
        description: 'Converts minerals into building materials',
        baseCost: { minerals: 100, water: 20, energy: 30 },
        costMultiplier: 1.7,
        production: { materials: 1 },
        consumption: { minerals: 5, energy: 3 }
    },
    'research-lab': {
        name: 'Research Lab',
        description: 'Generates science points for research',
        baseCost: { minerals: 80, water: 20, energy: 20, materials: 10 },
        costMultiplier: 1.8,
        production: { science: 1 },
        consumption: { energy: 3 }
    }
};

// Upgrade definitions
const upgrades = {
    'improved-tools': {
        name: 'Improved Tools',
        description: 'Better tools for more efficient mining',
        cost: { minerals: 100, science: 10 },
        effect: { 'mineral-extractor': { productionMultiplier: 1.5 } }
    },
    'efficient-extractors': {
        name: 'Efficient Extractors',
        description: 'More efficient mineral and water extraction',
        cost: { minerals: 200, water: 50, science: 20 },
        effect: { 'mineral-extractor': { productionMultiplier: 1.25, consumptionMultiplier: 0.8 },
                 'water-extractor': { productionMultiplier: 1.5, consumptionMultiplier: 0.8 } },
        requires: 'improved-tools'
    },
    'advanced-hydroponics': {
        name: 'Advanced Hydroponics',
        description: 'More efficient food production',
        cost: { minerals: 150, water: 100, science: 20 },
        effect: { 'hydroponics-farm': { productionMultiplier: 1.5, consumptionMultiplier: 0.75 } }
    },
    'solar-efficiency': {
        name: 'Solar Efficiency',
        description: 'Improved solar panel efficiency',
        cost: { minerals: 200, materials: 50, science: 30 },
        effect: { 'solar-panel': { productionMultiplier: 1.5 } }
    },
    'recycling-system': {
        name: 'Recycling System',
        description: 'Recover some resources used in production',
        cost: { minerals: 300, water: 100, materials: 50, science: 40 },
        effect: { global: { consumptionMultiplier: 0.8 } }
    },
    'advanced-research': {
        name: 'Advanced Research',
        description: 'Improved research methods',
        cost: { minerals: 250, energy: 100, science: 50 },
        effect: { 'research-lab': { productionMultiplier: 2 } }
    }
};

// Milestone definitions
const milestones = {
    'first-steps': {
        name: 'First Steps on Mars',
        description: 'Establish your initial base on Mars',
        requirements: { buildings: { total: 5 } },
        reward: { resources: { minerals: 100, energy: 50 } }
    },
    'self-sufficient': {
        name: 'Self-Sufficient Colony',
        description: 'Produce all basic resources needed for survival',
        requirements: { buildings: { 'water-extractor': 1, 'hydroponics-farm': 1, 'oxygen-generator': 1 } },
        reward: { resources: { science: 20 } }
    },
    'research-begins': {
        name: 'Research Begins',
        description: 'Start scientific research on Mars',
        requirements: { buildings: { 'research-lab': 1 } },
        reward: { resources: { science: 30 } }
    },
    'expanding-base': {
        name: 'Expanding Base',
        description: 'Grow your base to a significant size',
        requirements: { buildings: { total: 15 } },
        reward: { resources: { materials: 50 } }
    },
    'thriving-colony': {
        name: 'Thriving Colony',
        description: 'Create a self-sustaining colony that can thrive',
        requirements: { buildings: { 'mineral-extractor': 5, 'water-extractor': 3, 'solar-panel': 5, 
                                    'hydroponics-farm': 3, 'oxygen-generator': 3 } },
        reward: { resources: { minerals: 500, water: 200, energy: 200, food: 100, oxygen: 100, materials: 100, science: 100 } }
    }
};

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    loadGame();
    startGameLoop();
});

// Initialize the game
function initializeGame() {
    renderResources();
    renderBuildings();
    renderUpgrades();
    renderMilestones();
    updateStats();
    updateResourceRates();
}

// Setup event listeners
function setupEventListeners() {
    // Event listener for Mars click
    document.getElementById('mars-view').addEventListener('click', function() {
        gameState.resources.minerals += 1;
        gameState.stats.clicks += 1;
        gameState.stats.resourcesProduced += 1;
        renderResources();
        showNotification('Manually collected 1 mineral!');
    });

    // Save and reset buttons
    document.getElementById('save-btn').addEventListener('click', saveGame);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
}

// Render resources in the UI
function renderResources() {
    const resourcesContainer = document.getElementById('resources-container');
    resourcesContainer.innerHTML = '';
    
    for (const [resource, amount] of Object.entries(gameState.resources)) {
        const rate = gameState.resourceRates[resource];
        const rateDisplay = rate > 0 ? `+${rate.toFixed(1)}/s` : rate < 0 ? `${rate.toFixed(1)}/s` : '0/s';
        const rateClass = rate > 0 ? 'positive-rate' : rate < 0 ? 'negative-rate' : '';
        
        const resourceElement = document.createElement('div');
        resourceElement.className = `resource resource-${resource}`;
        
        resourceElement.innerHTML = `
            <div class="resource-label">${capitalizeFirstLetter(resource)}</div>
            <div class="resource-value">${Math.floor(amount)}</div>
            <div class="resource-rate ${rateClass}">${rateDisplay}</div>
        `;
        
        resourcesContainer.appendChild(resourceElement);
    }
}

// Render buildings in the UI
function renderBuildings() {
    const buildingsContainer = document.getElementById('buildings-container');
    buildingsContainer.innerHTML = '';
    
    // Check which resources are depleted
    const depleted = {};
    for (const [resource, amount] of Object.entries(gameState.resources)) {
        if (amount <= 0 && gameState.resourceRates[resource] < 0) {
            depleted[resource] = true;
        }
    }
    
    for (const [buildingId, buildingData] of Object.entries(buildings)) {
        const count = gameState.buildings[buildingId];
        const costs = calculateBuildingCosts(buildingId);
        const canAfford = canAffordBuilding(buildingId);
        
        // Check if building is inactive due to resource shortages
        let isInactive = false;
        if (count > 0) {
            for (const resource in buildingData.consumption) {
                if (depleted[resource]) {
                    isInactive = true;
                    break;
                }
            }
        }
        
        // Check if building this would cause negative resource generation
        const negativeImpact = [];
        for (const [resource, amount] of Object.entries(buildingData.consumption)) {
            // Calculate current rate and the impact of adding one more building
            const currentRate = gameState.resourceRates[resource] || 0;
            const consumptionMultiplier = calculateConsumptionMultiplier(buildingId);
            const additionalConsumption = amount * consumptionMultiplier;
            
            // If adding this building would cause the rate to go negative or make an already negative rate worse
            if ((currentRate >= 0 && currentRate - additionalConsumption < 0) || 
                (currentRate < 0 && additionalConsumption > 0)) {
                negativeImpact.push({
                    resource: resource,
                    current: currentRate,
                    projected: currentRate - additionalConsumption
                });
            }
        }
        
        const buildingElement = document.createElement('div');
        buildingElement.className = `building ${canAfford ? '' : 'disabled'} ${isInactive ? 'inactive' : ''}`;
        buildingElement.dataset.building = buildingId;
        
        // Generate production and consumption text
        let productionText = '';
        let consumptionText = '';
        
        for (const [resource, amount] of Object.entries(buildingData.production)) {
            productionText += `+${amount} ${capitalizeFirstLetter(resource)} `;
        }
        
        for (const [resource, amount] of Object.entries(buildingData.consumption)) {
            const resourceClass = depleted[resource] ? 'depleted-resource' : '';
            consumptionText += `-${amount} <span class="${resourceClass}">${capitalizeFirstLetter(resource)}</span> `;
        }
        
        // Create warning text for negative impact
        let warningText = '';
        if (negativeImpact.length > 0 && canAfford) {
            warningText = '<div class="resource-warning">';
            warningText += '<i class="fas fa-exclamation-triangle"></i> Warning: Building this will cause:';
            warningText += '<ul>';
            for (const impact of negativeImpact) {
                warningText += `<li>${capitalizeFirstLetter(impact.resource)} rate to become ${impact.projected.toFixed(1)}/s</li>`;
            }
            warningText += '</ul></div>';
        }
        
        buildingElement.innerHTML = `
            <div class="building-header">
                <div class="building-title">${buildingData.name}</div>
                <div class="building-count">${count}</div>
            </div>
            <div class="building-description">${buildingData.description}</div>
            <div class="building-effects">Produces: ${productionText}</div>
            ${consumptionText ? `<div class="building-effects">Consumes: ${consumptionText}</div>` : ''}
            ${isInactive ? '<div class="building-status inactive-status">Inactive: Resource shortage</div>' : ''}
            ${warningText}
            <div class="building-cost">Cost: ${formatCosts(costs)}</div>
            <button class="building-button" ${canAfford ? '' : 'disabled'}>Build</button>
        `;
        
        buildingElement.querySelector('button').addEventListener('click', function() {
            buildBuilding(buildingId);
        });
        
        buildingsContainer.appendChild(buildingElement);
    }
}

// Render upgrades in the UI
function renderUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container');
    upgradesContainer.innerHTML = '';
    
    for (const [upgradeId, upgradeData] of Object.entries(upgrades)) {
        // Skip if already researched
        if (gameState.upgrades[upgradeId]) continue;
        
        // Skip if requirements not met
        if (upgradeData.requires && !gameState.upgrades[upgradeData.requires]) continue;
        
        const canAfford = canAffordUpgrade(upgradeId);
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = `upgrade ${canAfford ? '' : 'disabled'}`;
        upgradeElement.dataset.upgrade = upgradeId;
        
        // Generate effect text
        let effectText = '';
        if (upgradeData.effect) {
            if (upgradeData.effect.global) {
                const global = upgradeData.effect.global;
                if (global.consumptionMultiplier) 
                    effectText += `${Math.round((1 - global.consumptionMultiplier) * 100)}% less resource consumption`;
            } else {
                for (const [target, changes] of Object.entries(upgradeData.effect)) {
                    if (changes.productionMultiplier)
                        effectText += `${Math.round((changes.productionMultiplier - 1) * 100)}% more production for ${buildings[target].name} `;
                    if (changes.consumptionMultiplier)
                        effectText += `${Math.round((1 - changes.consumptionMultiplier) * 100)}% less consumption for ${buildings[target].name} `;
                }
            }
        }
        
        upgradeElement.innerHTML = `
            <div class="upgrade-title">${upgradeData.name}</div>
            <div class="upgrade-description">${upgradeData.description}</div>
            <div class="upgrade-effects">Effect: ${effectText}</div>
            <div class="upgrade-cost">Cost: ${formatCosts(upgradeData.cost)}</div>
            <button class="upgrade-button" ${canAfford ? '' : 'disabled'}>Research</button>
        `;
        
        upgradeElement.querySelector('button').addEventListener('click', function() {
            researchUpgrade(upgradeId);
        });
        
        upgradesContainer.appendChild(upgradeElement);
    }
    
    // Show a message if no upgrades are available
    if (upgradesContainer.children.length === 0) {
        upgradesContainer.innerHTML = '<p>No upgrades available at this time. Build more infrastructure or complete milestones to unlock upgrades.</p>';
    }
}

// Render milestones in the UI
function renderMilestones() {
    const milestonesContainer = document.getElementById('milestones-container');
    milestonesContainer.innerHTML = '';
    
    for (const [milestoneId, milestoneData] of Object.entries(milestones)) {
        const completed = gameState.milestones[milestoneId];
        
        const milestoneElement = document.createElement('div');
        milestoneElement.className = `milestone ${completed ? 'completed' : ''}`;
        
        // Generate requirements text
        let reqText = '';
        if (milestoneData.requirements.buildings) {
            const buildingReqs = milestoneData.requirements.buildings;
            if (buildingReqs.total) {
                reqText += `Total buildings: ${calculateTotalBuildings()}/${buildingReqs.total} `;
            }
            for (const [building, count] of Object.entries(buildingReqs)) {
                if (building !== 'total') {
                    const buildingName = buildings[building] ? buildings[building].name : building;
                    reqText += `${buildingName}: ${gameState.buildings[building] || 0}/${count} `;
                }
            }
        }
        
        // Generate reward text
        let rewardText = '';
        if (milestoneData.reward.resources) {
            for (const [resource, amount] of Object.entries(milestoneData.reward.resources)) {
                rewardText += `${amount} ${capitalizeFirstLetter(resource)} `;
            }
        }
        
        milestoneElement.innerHTML = `
            <div class="milestone-title">
                ${completed ? '<i class="fas fa-check-circle"></i>' : ''}
                ${milestoneData.name}
            </div>
            <div class="milestone-description">${milestoneData.description}</div>
            <div class="milestone-requirements">Requirements: ${reqText}</div>
            <div class="milestone-reward">Reward: ${rewardText}</div>
        `;
        
        milestonesContainer.appendChild(milestoneElement);
    }
}

// Update statistics display
function updateStats() {
    const statsContainer = document.getElementById('statistics');
    statsContainer.innerHTML = '';
    
    const stats = [
        { label: 'Days on Mars', value: gameState.stats.daysSurvived },
        { label: 'Total clicks', value: gameState.stats.clicks },
        { label: 'Buildings constructed', value: gameState.stats.buildingsBuilt },
        { label: 'Upgrades researched', value: gameState.stats.upgradesResearched },
        { label: 'Resources produced', value: Math.floor(gameState.stats.resourcesProduced) }
    ];
    
    for (const stat of stats) {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.innerHTML = `
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
        `;
        statsContainer.appendChild(statElement);
    }
}

// Calculate building costs based on how many have been built
function calculateBuildingCosts(buildingId) {
    const building = buildings[buildingId];
    const count = gameState.buildings[buildingId];
    const costs = {};
    
    for (const [resource, baseCost] of Object.entries(building.baseCost)) {
        costs[resource] = Math.floor(baseCost * Math.pow(building.costMultiplier, count));
    }
    
    return costs;
}

// Check if player can afford building
function canAffordBuilding(buildingId) {
    const costs = calculateBuildingCosts(buildingId);
    
    for (const [resource, cost] of Object.entries(costs)) {
        if (gameState.resources[resource] < cost) {
            return false;
        }
    }
    
    return true;
}

// Check if player can afford upgrade
function canAffordUpgrade(upgradeId) {
    const upgrade = upgrades[upgradeId];
    
    for (const [resource, cost] of Object.entries(upgrade.cost)) {
        if (gameState.resources[resource] < cost) {
            return false;
        }
    }
    
    return true;
}

// Build a building
function buildBuilding(buildingId) {
    if (!canAffordBuilding(buildingId)) return;
    
    const costs = calculateBuildingCosts(buildingId);
    
    // Deduct resources
    for (const [resource, cost] of Object.entries(costs)) {
        gameState.resources[resource] -= cost;
    }
    
    // Add building
    gameState.buildings[buildingId]++;
    gameState.stats.buildingsBuilt++;
    
    // Update UI
    renderResources();
    renderBuildings();
    updateResourceRates();
    checkMilestones();
    
    showNotification(`Built a new ${buildings[buildingId].name}!`);
}

// Research an upgrade
function researchUpgrade(upgradeId) {
    if (!canAffordUpgrade(upgradeId)) return;
    
    const upgrade = upgrades[upgradeId];
    
    // Deduct resources
    for (const [resource, cost] of Object.entries(upgrade.cost)) {
        gameState.resources[resource] -= cost;
    }
    
    // Apply upgrade
    gameState.upgrades[upgradeId] = true;
    gameState.stats.upgradesResearched++;
    
    // Update UI
    renderResources();
    renderUpgrades();
    updateResourceRates();
    
    showNotification(`Researched ${upgrade.name}!`);
}

// Update resource production/consumption rates
function updateResourceRates() {
    // Reset rates
    for (const resource in gameState.resourceRates) {
        gameState.resourceRates[resource] = 0;
    }
    
    // Calculate production and consumption from buildings
    for (const [buildingId, count] of Object.entries(gameState.buildings)) {
        if (count === 0) continue;
        
        const building = buildings[buildingId];
        
        // Apply upgrades to production
        const productionMultiplier = calculateProductionMultiplier(buildingId);
        const consumptionMultiplier = calculateConsumptionMultiplier(buildingId);
        
        // Add production
        for (const [resource, baseAmount] of Object.entries(building.production)) {
            gameState.resourceRates[resource] += baseAmount * count * productionMultiplier;
        }
        
        // Subtract consumption
        for (const [resource, baseAmount] of Object.entries(building.consumption)) {
            gameState.resourceRates[resource] -= baseAmount * count * consumptionMultiplier;
        }
    }
    
    renderResources();
}

// Calculate production multiplier based on upgrades
function calculateProductionMultiplier(buildingId) {
    let multiplier = 1;
    
    for (const [upgradeId, researched] of Object.entries(gameState.upgrades)) {
        if (!researched) continue;
        
        const upgrade = upgrades[upgradeId];
        if (!upgrade.effect) continue;
        
        // Check for global effects
        if (upgrade.effect.global && upgrade.effect.global.productionMultiplier) {
            multiplier *= upgrade.effect.global.productionMultiplier;
        }
        
        // Check for specific building effects
        if (upgrade.effect[buildingId] && upgrade.effect[buildingId].productionMultiplier) {
            multiplier *= upgrade.effect[buildingId].productionMultiplier;
        }
    }
    
    return multiplier;
}

// Calculate consumption multiplier based on upgrades
function calculateConsumptionMultiplier(buildingId) {
    let multiplier = 1;
    
    for (const [upgradeId, researched] of Object.entries(gameState.upgrades)) {
        if (!researched) continue;
        
        const upgrade = upgrades[upgradeId];
        if (!upgrade.effect) continue;
        
        // Check for global effects
        if (upgrade.effect.global && upgrade.effect.global.consumptionMultiplier) {
            multiplier *= upgrade.effect.global.consumptionMultiplier;
        }
        
        // Check for specific building effects
        if (upgrade.effect[buildingId] && upgrade.effect[buildingId].consumptionMultiplier) {
            multiplier *= upgrade.effect[buildingId].consumptionMultiplier;
        }
    }
    
    return multiplier;
}

// Check milestones
function checkMilestones() {
    let milestonesUpdated = false;
    
    for (const [milestoneId, milestoneData] of Object.entries(milestones)) {
        // Skip already completed milestones
        if (gameState.milestones[milestoneId]) continue;
        
        // Check building requirements
        let requirementsMet = true;
        
        if (milestoneData.requirements.buildings) {
            const buildingReqs = milestoneData.requirements.buildings;
            
            // Check total buildings requirement
            if (buildingReqs.total && calculateTotalBuildings() < buildingReqs.total) {
                requirementsMet = false;
            }
            
            // Check specific building requirements
            for (const [building, requiredCount] of Object.entries(buildingReqs)) {
                if (building !== 'total' && gameState.buildings[building] < requiredCount) {
                    requirementsMet = false;
                }
            }
        }
        
        if (requirementsMet) {
            gameState.milestones[milestoneId] = true;
            milestonesUpdated = true;
            
            // Apply rewards
            if (milestoneData.reward.resources) {
                for (const [resource, amount] of Object.entries(milestoneData.reward.resources)) {
                    gameState.resources[resource] += amount;
                }
            }
            
            showNotification(`Milestone achieved: ${milestoneData.name}!`);
        }
    }
    
    if (milestonesUpdated) {
        renderResources();
        renderMilestones();
        renderUpgrades(); // In case new upgrades are unlocked
    }
}

// Calculate total number of buildings
function calculateTotalBuildings() {
    return Object.values(gameState.buildings).reduce((a, b) => a + b, 0);
}

// Game loop - update resources based on production rates
function startGameLoop() {
    let lastBuildingUpdateTime = Date.now();
    
    setInterval(function() {
        const now = Date.now();
        const deltaTime = (now - gameState.lastUpdateTime) / 1000; // in seconds
        gameState.lastUpdateTime = now;
        
        // Track initial resource state to check if we need to update buildings UI
        const initialResources = {...gameState.resources};
        
        // Update resources based on rates and track which resources are depleted
        const depleted = {};
        
        // First pass: apply resource production and identify which resources would be depleted
        const newResourceValues = {...gameState.resources};
        
        for (const [resource, rate] of Object.entries(gameState.resourceRates)) {
            if (rate < 0) {
                // Check if this resource would be depleted
                const newValue = newResourceValues[resource] + rate * deltaTime;
                if (newValue < 0) {
                    depleted[resource] = true;
                }
            }
        }
        
        // Second pass: recalculate production/consumption based on depleted resources
        if (Object.keys(depleted).length > 0) {
            // Some resources are depleted, so we need to recalculate rates
            
            // Reset rates
            for (const resource in gameState.resourceRates) {
                gameState.resourceRates[resource] = 0;
            }
            
            // Recalculate for each building, skipping those that require depleted resources
            for (const [buildingId, count] of Object.entries(gameState.buildings)) {
                if (count === 0) continue;
                
                const building = buildings[buildingId];
                
                // Check if this building consumes any depleted resources
                let canOperate = true;
                for (const resource in building.consumption) {
                    if (depleted[resource]) {
                        canOperate = false;
                        break;
                    }
                }
                
                if (canOperate) {
                    // Building can operate, add its production and consumption
                    const productionMultiplier = calculateProductionMultiplier(buildingId);
                    const consumptionMultiplier = calculateConsumptionMultiplier(buildingId);
                    
                    // Add production
                    for (const [resource, baseAmount] of Object.entries(building.production)) {
                        gameState.resourceRates[resource] += baseAmount * count * productionMultiplier;
                    }
                    
                    // Add consumption
                    for (const [resource, baseAmount] of Object.entries(building.consumption)) {
                        gameState.resourceRates[resource] -= baseAmount * count * consumptionMultiplier;
                    }
                } else {
                    // If any building can't operate due to depleted resources, show a notification
                    // (but not too frequently to avoid spam)
                    if (Math.random() < 0.01) { // Show roughly once per 100 game loop cycles
                        showNotification(`Some ${buildings[buildingId].name}s are inactive due to resource shortage!`);
                    }
                }
            }
        }
        
        // Apply the recalculated rates
        for (const [resource, rate] of Object.entries(gameState.resourceRates)) {
            gameState.resources[resource] += rate * deltaTime;
            if (gameState.resources[resource] < 0) gameState.resources[resource] = 0;
            if (rate > 0) gameState.stats.resourcesProduced += rate * deltaTime;
        }
        
        // Update day counter (1 real second = 1 Mars day)
        gameState.stats.daysSurvived = Math.floor((now - gameState.gameStartTime) / 1000);
        
        // Auto-save every minute
        if (now - gameState.lastSaveTime > 60000) {
            saveGame();
            gameState.lastSaveTime = now;
        }
        
        // Update UI
        renderResources();
        
        // Only update buildings UI every 2 seconds, or if resources change significantly
        const timeSinceLastBuildingUpdate = now - lastBuildingUpdateTime;
        let shouldUpdateBuildings = false;
        
        // Check for significant resource changes (resources increasing by at least 1 unit)
        for (const [resource, amount] of Object.entries(gameState.resources)) {
            const initial = initialResources[resource];
            if (Math.floor(amount) > Math.floor(initial)) {
                shouldUpdateBuildings = true;
                break;
            }
        }
        
        if (shouldUpdateBuildings || timeSinceLastBuildingUpdate > 2000) {
            updateBuildingsUI();
            lastBuildingUpdateTime = now;
        }
        
        updateStats();
        
    }, 100); // Update 10 times per second
}

// Update just the specific parts of the building UI that need to change
function updateBuildingsUI() {
    const buildingElements = document.querySelectorAll('.building');
    
    // Check which resources are depleted
    const depleted = {};
    for (const [resource, amount] of Object.entries(gameState.resources)) {
        if (amount <= 0 && gameState.resourceRates[resource] < 0) {
            depleted[resource] = true;
        }
    }
    
    // Update each building's status without completely rebuilding
    buildingElements.forEach(buildingElement => {
        const buildingId = buildingElement.dataset.building;
        if (!buildingId) return;
        
        const buildingData = buildings[buildingId];
        const count = gameState.buildings[buildingId];
        const canAfford = canAffordBuilding(buildingId);
        
        // Update affordability class
        if (canAfford) {
            buildingElement.classList.remove('disabled');
            buildingElement.querySelector('button').removeAttribute('disabled');
        } else {
            buildingElement.classList.add('disabled');
            buildingElement.querySelector('button').setAttribute('disabled', true);
        }
        
        // Update count
        const countElement = buildingElement.querySelector('.building-count');
        if (countElement) {
            countElement.textContent = count;
        }
        
        // Check if building is inactive due to resource shortages
        let isInactive = false;
        if (count > 0) {
            for (const resource in buildingData.consumption) {
                if (depleted[resource]) {
                    isInactive = true;
                    break;
                }
            }
        }
        
        // Update inactive status
        if (isInactive) {
            buildingElement.classList.add('inactive');
            
            // Add status message if not present
            if (!buildingElement.querySelector('.inactive-status')) {
                const statusDiv = document.createElement('div');
                statusDiv.className = 'building-status inactive-status';
                statusDiv.textContent = 'Inactive: Resource shortage';
                
                // Insert before the cost element
                const costElement = buildingElement.querySelector('.building-cost');
                if (costElement) {
                    buildingElement.insertBefore(statusDiv, costElement);
                }
            }
        } else {
            buildingElement.classList.remove('inactive');
            
            // Remove status message if present
            const statusElement = buildingElement.querySelector('.inactive-status');
            if (statusElement) {
                statusElement.remove();
            }
        }
        
        // Update negative impact warning (regenerate this part because it's more complex)
        const oldWarning = buildingElement.querySelector('.resource-warning');
        if (oldWarning) {
            oldWarning.remove();
        }
        
        // Only recalculate warning if affordable (to avoid unnecessary calculations)
        if (canAfford) {
            // Check if building this would cause negative resource generation
            const negativeImpact = [];
            for (const [resource, amount] of Object.entries(buildingData.consumption)) {
                // Calculate current rate and the impact of adding one more building
                const currentRate = gameState.resourceRates[resource] || 0;
                const consumptionMultiplier = calculateConsumptionMultiplier(buildingId);
                const additionalConsumption = amount * consumptionMultiplier;
                
                // If adding this building would cause the rate to go negative or make an already negative rate worse
                if ((currentRate >= 0 && currentRate - additionalConsumption < 0) || 
                    (currentRate < 0 && additionalConsumption > 0)) {
                    negativeImpact.push({
                        resource: resource,
                        current: currentRate,
                        projected: currentRate - additionalConsumption
                    });
                }
            }
            
            // Create warning text for negative impact if needed
            if (negativeImpact.length > 0) {
                const warningElement = document.createElement('div');
                warningElement.className = 'resource-warning';
                
                let warningContent = '<i class="fas fa-exclamation-triangle"></i> Warning: Building this will cause:';
                warningContent += '<ul>';
                for (const impact of negativeImpact) {
                    warningContent += `<li>${capitalizeFirstLetter(impact.resource)} rate to become ${impact.projected.toFixed(1)}/s</li>`;
                }
                warningContent += '</ul>';
                
                warningElement.innerHTML = warningContent;
                
                // Insert before the cost element
                const costElement = buildingElement.querySelector('.building-cost');
                if (costElement) {
                    buildingElement.insertBefore(warningElement, costElement);
                }
            }
        }
        
        // Update building costs (they increase as you build more)
        const costs = calculateBuildingCosts(buildingId);
        const costElement = buildingElement.querySelector('.building-cost');
        if (costElement) {
            costElement.textContent = `Cost: ${formatCosts(costs)}`;
        }
    });
}

// Helper function to format costs
function formatCosts(costs) {
    return Object.entries(costs)
        .map(([resource, amount]) => `${amount} ${capitalizeFirstLetter(resource)}`)
        .join(', ');
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show notification
function showNotification(message) {
    if (!gameState.settings.notificationsEnabled) return;
    
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Save game
function saveGame() {
    localStorage.setItem('marsColonySave', JSON.stringify(gameState));
    showNotification('Game saved!');
}

// Load game
function loadGame() {
    const savedGame = localStorage.getItem('marsColonySave');
    if (savedGame) {
        const savedState = JSON.parse(savedGame);
        
        // Merge saved state with current state
        for (const key in savedState) {
            if (typeof savedState[key] === 'object' && savedState[key] !== null) {
                // Deep merge objects
                for (const subKey in savedState[key]) {
                    if (gameState[key]) {
                        gameState[key][subKey] = savedState[key][subKey];
                    }
                }
            } else {
                gameState[key] = savedState[key];
            }
        }
        
        // Set last update time to now to prevent huge jumps in resources
        gameState.lastUpdateTime = Date.now();
        
        // Refresh UI
        renderResources();
        renderBuildings();
        renderUpgrades();
        renderMilestones();
        updateStats();
        updateResourceRates();
        
        showNotification('Game loaded!');
    }
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? All progress will be lost!')) {
        localStorage.removeItem('marsColonySave');
        location.reload();
    }
} 