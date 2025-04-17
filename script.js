// Game state
let gameState = {
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
        }
    },
    resourcesPerClick: {
        minerals: 1,
        water: 0,
        energy: 0,
        food: 0,
        science: 0
    },
    totalClicks: 0,
    lastSaved: Date.now(),
    buildings: [
        {
            id: 'mineral-extractor',
            name: 'Mineral Extractor',
            description: 'Basic equipment to extract minerals from Martian soil',
            cost: {
                minerals: 10
            },
            production: {
                minerals: 0.2
            },
            owned: 0,
            unlocked: true,
            category: 'resource'
        },
        {
            id: 'solar-panel',
            name: 'Solar Panel',
            description: 'Generates energy from sunlight',
            cost: {
                minerals: 15
            },
            production: {
                energy: 0.3
            },
            owned: 0,
            unlocked: true,
            category: 'resource'
        },
        {
            id: 'water-extractor',
            name: 'Water Extractor',
            description: 'Extracts water from ice deposits in the soil',
            cost: {
                minerals: 30,
                energy: 5
            },
            production: {
                water: 0.2
            },
            owned: 0,
            unlocked: true,
            category: 'resource'
        },
        {
            id: 'greenhouse',
            name: 'Greenhouse',
            description: 'Produces food and conducts basic research',
            cost: {
                minerals: 50,
                water: 10,
                energy: 5
            },
            production: {
                food: 0.3,
                science: 0.1
            },
            owned: 0,
            unlocked: true,
            category: 'resource'
        },
        {
            id: 'habitat',
            name: 'Habitat Module',
            description: 'Houses colonists who conduct research',
            cost: {
                minerals: 100,
                water: 20,
                energy: 15,
                food: 10
            },
            production: {
                science: 0.5
            },
            owned: 0,
            unlocked: true,
            category: 'colonist'
        },
        {
            id: 'research-lab',
            name: 'Research Laboratory',
            description: 'Advanced facility for scientific research',
            cost: {
                minerals: 200,
                water: 40,
                energy: 50,
                food: 30
            },
            production: {
                science: 1.5
            },
            owned: 0,
            unlocked: false,
            category: 'science'
        },
        {
            id: 'hydroponics-bay',
            name: 'Hydroponics Bay',
            description: 'Efficient food production system',
            cost: {
                minerals: 300,
                water: 100,
                energy: 80
            },
            production: {
                food: 2.0
            },
            owned: 0,
            unlocked: false,
            category: 'resource'
        },
        {
            id: 'nuclear-generator',
            name: 'Nuclear Generator',
            description: 'Provides large amounts of stable energy',
            cost: {
                minerals: 500,
                water: 150,
                energy: 200,
                science: 100
            },
            production: {
                energy: 5.0
            },
            owned: 0,
            unlocked: false,
            category: 'resource'
        },
        {
            id: 'water-recycler',
            name: 'Water Recycling System',
            description: 'Greatly improves water efficiency',
            cost: {
                minerals: 400,
                energy: 200,
                science: 150
            },
            production: {
                water: 3.0
            },
            owned: 0,
            unlocked: false,
            category: 'resource'
        },
        {
            id: 'dome',
            name: 'Martian Dome',
            description: 'Large enclosed area with Earth-like conditions',
            cost: {
                minerals: 2000,
                water: 500,
                energy: 800,
                food: 400,
                science: 500
            },
            production: {
                minerals: 2.0,
                water: 2.0,
                energy: 2.0,
                food: 3.0,
                science: 3.0
            },
            owned: 0,
            unlocked: false,
            category: 'terraforming'
        },
        {
            id: 'terraformer',
            name: 'Terraforming Station',
            description: 'Begins the process of making Mars habitable',
            cost: {
                minerals: 5000,
                water: 2000,
                energy: 3000,
                food: 1000,
                science: 2000
            },
            production: {
                minerals: 8.0,
                water: 8.0,
                energy: 8.0,
                food: 8.0,
                science: 8.0
            },
            owned: 0,
            unlocked: false,
            category: 'terraforming'
        }
    ],
    upgrades: [
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
            effect: () => {
                const building = gameState.buildings.find(b => b.id === 'mineral-extractor');
                if (building && building.production.minerals) {
                    adjustBuildingProduction(building, 'minerals', building.production.minerals);
                    building.production.minerals *= 2;
                    adjustBuildingProduction(building, 'minerals', building.production.minerals);
                }
            }
        },
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
            effect: () => {
                const building = gameState.buildings.find(b => b.id === 'solar-panel');
                if (building && building.production.energy) {
                    adjustBuildingProduction(building, 'energy', building.production.energy);
                    building.production.energy *= 2;
                    adjustBuildingProduction(building, 'energy', building.production.energy);
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
            effect: () => {
                const building = gameState.buildings.find(b => b.id === 'water-extractor');
                if (building && building.production.water) {
                    adjustBuildingProduction(building, 'water', building.production.water);
                    building.production.water *= 2.5;
                    adjustBuildingProduction(building, 'water', building.production.water);
                }
            }
        },
        {
            id: 'hydroponics',
            name: 'Advanced Hydroponics',
            description: 'All food production increased by 50%',
            cost: {
                minerals: 800,
                water: 400,
                energy: 300,
                science: 300
            },
            purchased: false,
            unlocked: false,
            effect: () => {
                gameState.buildings.forEach(building => {
                    if (building.production.food) {
                        adjustBuildingProduction(building, 'food', building.production.food);
                        building.production.food *= 1.5;
                        adjustBuildingProduction(building, 'food', building.production.food);
                    }
                });
            }
        },
        {
            id: 'research-methods',
            name: 'Advanced Research Methods',
            description: 'All science production increased by 50%',
            cost: {
                minerals: 1000,
                water: 500,
                energy: 500,
                food: 300,
                science: 500
            },
            purchased: false,
            unlocked: false,
            effect: () => {
                gameState.buildings.forEach(building => {
                    if (building.production.science) {
                        adjustBuildingProduction(building, 'science', building.production.science);
                        building.production.science *= 1.5;
                        adjustBuildingProduction(building, 'science', building.production.science);
                    }
                });
            }
        }
    ],
    milestones: [
        {
            id: 'first-outpost',
            name: 'First Outpost',
            description: 'Establish your first outpost on Mars',
            requirement: {
                minerals: 50
            },
            unlocked: false
        },
        {
            id: 'sustainable-energy',
            name: 'Sustainable Energy',
            description: 'Develop a sustainable energy network',
            requirement: {
                energy: 100
            },
            unlocked: false,
            onUnlock: () => {
                gameState.upgrades[2].unlocked = true; // Solar efficiency
                updateUpgradesList();
            }
        },
        {
            id: 'water-systems',
            name: 'Water Systems',
            description: 'Establish reliable water extraction and recycling',
            requirement: {
                water: 200
            },
            unlocked: false,
            onUnlock: () => {
                gameState.upgrades[3].unlocked = true; // Water drilling
                updateUpgradesList();
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
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'research-lab').unlocked = true;
                updateBuildingsList();
            }
        },
        {
            id: 'food-production',
            name: 'Food Production',
            description: 'Create advanced food production systems',
            requirement: {
                food: 500
            },
            unlocked: false,
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'hydroponics-bay').unlocked = true;
                gameState.upgrades[4].unlocked = true; // Hydroponics
                updateBuildingsList();
                updateUpgradesList();
            }
        },
        {
            id: 'advanced-power',
            name: 'Advanced Power Grid',
            description: 'Implement stable high-output power generation',
            requirement: {
                energy: 1000
            },
            unlocked: false,
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'nuclear-generator').unlocked = true;
                updateBuildingsList();
            }
        },
        {
            id: 'water-mastery',
            name: 'Water Mastery',
            description: 'Achieve complete control over Mars water resources',
            requirement: {
                water: 2000
            },
            unlocked: false,
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'water-recycler').unlocked = true;
                updateBuildingsList();
            }
        },
        {
            id: 'scientific-breakthrough',
            name: 'Scientific Breakthrough',
            description: 'Make a major breakthrough in Martian colonization research',
            requirement: {
                science: 3000
            },
            unlocked: false,
            onUnlock: () => {
                gameState.upgrades[5].unlocked = true; // Research methods
                updateUpgradesList();
            }
        },
        {
            id: 'dome-construction',
            name: 'Dome Construction',
            description: 'Build the first large-scale enclosed habitat on Mars',
            requirement: {
                minerals: 5000,
                water: 2000,
                energy: 3000,
                food: 1000,
                science: 2000
            },
            unlocked: false,
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'dome').unlocked = true;
                updateBuildingsList();
            }
        },
        {
            id: 'terraforming',
            name: 'Terraforming Initiative',
            description: 'Begin the long process of terraforming Mars',
            requirement: {
                minerals: 10000,
                water: 5000,
                energy: 8000,
                food: 3000,
                science: 6000
            },
            unlocked: false,
            onUnlock: () => {
                gameState.buildings.find(b => b.id === 'terraformer').unlocked = true;
                updateBuildingsList();
            }
        }
    ]
};

// DOM elements
const resourcesDisplay = document.getElementById('resources-display');
const resourcesPerSecondDisplay = document.getElementById('resources-per-second');
const marsButton = document.getElementById('mars');
const buildingsList = document.getElementById('buildings-list');
const milestonesList = document.getElementById('milestones-list');
const upgradesList = document.getElementById('upgrades-list');
const statsContainer = document.getElementById('stats-container');
const resourcesContainer = document.getElementById('resources-container');

// Helper function to adjust resource production rates
function adjustBuildingProduction(building, resourceType, amount) {
    gameState.resources[resourceType].perSecond -= building.owned * amount;
}

// Initialize the game
function initGame() {
    // Load save game if exists
    loadGame();

    // Set up click handler
    marsButton.addEventListener('click', handleMarsClick);
    
    // Create initial resources display
    updateResourcesDisplay();
    
    // Create initial buildings list
    updateBuildingsList();
    
    // Create initial upgrades list
    updateUpgradesList();
    
    // Create initial milestones list
    updateMilestonesList();
    
    // Update stats
    updateStats();
    
    // Start game loop
    setInterval(gameLoop, 1000);
    
    // Start autosave
    setInterval(saveGame, 30000); // Save every 30 seconds
    
    // Enable save button
    document.getElementById('save-button').addEventListener('click', () => {
        saveGame();
        showNotification('Game saved successfully!');
    });

    // Enable reset button
    document.getElementById('reset-button').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your game? This cannot be undone.')) {
            localStorage.removeItem('marsColonizerSave');
            location.reload();
        }
    });
    
    // Initialize tooltips
    initTooltips();
}

// Initialize tooltips for resources
function initTooltips() {
    // Set up tooltips for resources
    const resourceElements = document.querySelectorAll('.resource');
    
    resourceElements.forEach(el => {
        const resourceType = el.dataset.resource;
        if (resourceType && gameState.resources[resourceType]) {
            const resource = gameState.resources[resourceType];
            el.setAttribute('title', resource.description);
            
            // You could use a tooltip library here if desired
        }
    });
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
    
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateStats();
    checkMilestones();
}

// Play sound effect
function playSound(soundType) {
    // Only play if sounds are enabled
    if (!document.getElementById('sound-toggle').checked) return;
    
    const sound = new Audio();
    
    switch(soundType) {
        case 'click':
            sound.src = 'sounds/click.mp3';
            sound.volume = 0.2;
            break;
        case 'purchase':
            sound.src = 'sounds/purchase.mp3';
            sound.volume = 0.3;
            break;
        case 'milestone':
            sound.src = 'sounds/milestone.mp3';
            sound.volume = 0.4;
            break;
    }
    
    sound.play().catch(e => console.log("Audio play failed: " + e));
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Create floating text effect when clicking
function createFloatingText(event, text) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.position = 'absolute';
    floatingText.style.left = `${event.clientX}px`;
    floatingText.style.top = `${event.clientY}px`;
    floatingText.style.color = '#ff6b4a';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.fontSize = '1.2rem';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(floatingText);
    
    // Animation
    setTimeout(() => {
        floatingText.style.opacity = '0';
        floatingText.style.transform = 'translateY(-30px)';
    }, 10);
    
    // Remove element after animation
    setTimeout(() => {
        document.body.removeChild(floatingText);
    }, 1000);
}

// Game loop - runs every second
function gameLoop() {
    // Add resources based on per-second rates
    for (const resourceType in gameState.resources) {
        gameState.resources[resourceType].amount += gameState.resources[resourceType].perSecond;
        gameState.resources[resourceType].totalEarned += gameState.resources[resourceType].perSecond;
    }
    
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    checkMilestones();
}

// Update the resources display
function updateResourcesDisplay() {
    // If the container doesn't exist yet, create it
    if (!resourcesContainer || !resourcesContainer.children.length) {
        createResourcesDisplay();
        return;
    }
    
    // Update existing resource displays
    for (const resourceType in gameState.resources) {
        const resourceElement = document.querySelector(`.resource[data-resource="${resourceType}"]`);
        if (resourceElement) {
            const amountElement = resourceElement.querySelector('.resource-amount');
            const rateElement = resourceElement.querySelector('.resource-rate');
            
            if (amountElement) {
                amountElement.textContent = formatNumber(Math.floor(gameState.resources[resourceType].amount));
            }
            
            if (rateElement) {
                rateElement.textContent = formatNumber(gameState.resources[resourceType].perSecond.toFixed(1));
            }
        }
    }
}

// Create the initial resources display
function createResourcesDisplay() {
    if (!resourcesContainer) return;
    
    resourcesContainer.innerHTML = '';
    
    for (const resourceType in gameState.resources) {
        const resource = gameState.resources[resourceType];
        
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource';
        resourceElement.dataset.resource = resourceType;
        
        resourceElement.innerHTML = `
            <div class="resource-icon"><i class="${resource.icon}"></i></div>
            <div class="resource-info">
                <div class="resource-name">${resource.name}</div>
                <div class="resource-value">
                    <span class="resource-amount">${formatNumber(Math.floor(resource.amount))}</span>
                    <span class="resource-rate">(+${formatNumber(resource.perSecond.toFixed(1))})</span>
                </div>
            </div>
        `;
        
        resourcesContainer.appendChild(resourceElement);
    }
    
    // Re-initialize tooltips
    initTooltips();
}

// Update stats display
function updateStats() {
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat">Total Clicks: ${formatNumber(gameState.totalClicks)}</div>
            <div class="stat">Buildings Owned: ${gameState.buildings.reduce((sum, b) => sum + b.owned, 0)}</div>
            <div class="stat-header">Total Resources Collected:</div>
            ${Object.keys(gameState.resources).map(type => 
                `<div class="stat"><i class="${gameState.resources[type].icon}"></i> ${gameState.resources[type].name}: ${formatNumber(Math.floor(gameState.resources[type].totalEarned))}</div>`
            ).join('')}
        `;
    }
}

// Format large numbers
function formatNumber(num) {
    if (num < 1000) return num;
    
    const units = ["K", "M", "B", "T"];
    const unit = Math.floor((num.toString().length - 1) / 3);
    
    if (unit === 0) return num;
    
    const divisor = Math.pow(1000, unit);
    const shortened = (num / divisor).toFixed(1);
    
    return `${shortened}${units[unit-1]}`;
}

// Calculate the cost of the next building
function calculateBuildingCost(building, resourceType) {
    return Math.floor(building.cost[resourceType] * Math.pow(1.15, building.owned));
}

// Check if player can afford a building
function canAffordBuilding(building) {
    for (const resourceType in building.cost) {
        const cost = calculateBuildingCost(building, resourceType);
        if (gameState.resources[resourceType].amount < cost) {
            return false;
        }
    }
    return true;
}

// Update buildings list
function updateBuildingsList() {
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
            
            // Production info
            const productionElement = document.createElement('div');
            productionElement.className = 'building-production';
            
            let productionHtml = 'Produces: ';
            for (const resourceType in building.production) {
                if (building.production[resourceType] > 0) {
                    productionHtml += `<span class="resource-${resourceType}">+${formatNumber(building.production[resourceType].toFixed(1))} ${gameState.resources[resourceType].name}</span> `;
                }
            }
            productionElement.innerHTML = productionHtml;
            
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

// Helper to format category name
function formatCategoryName(category) {
    return category.charAt(0).toUpperCase() + category.slice(1) + ' Buildings';
}

// Handle building purchase
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
        gameState.resources[resourceType].perSecond += building.production[resourceType];
    }
    
    // Play purchase sound
    playSound('purchase');
    
    // Update displays
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateStats();
}

// Check if player can afford an upgrade
function canAffordUpgrade(upgrade) {
    for (const resourceType in upgrade.cost) {
        if (gameState.resources[resourceType].amount < upgrade.cost[resourceType]) {
            return false;
        }
    }
    return true;
}

// Update upgrades list
function updateUpgradesList() {
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

// Check if any milestones have been achieved
function checkMilestones() {
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

// Update milestones list
function updateMilestonesList() {
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

// Save game to localStorage
function saveGame() {
    gameState.lastSaved = Date.now();
    localStorage.setItem('marsColonizerSave', JSON.stringify(gameState));
}

// Load game from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('marsColonizerSave');
    
    if (savedGame) {
        const loadedState = JSON.parse(savedGame);
        
        // Handle version migrations - add properties that might not exist in older saves
        if (!loadedState.totalClicks) loadedState.totalClicks = 0;
        
        // Calculate offline progress
        const timeDiff = (Date.now() - loadedState.lastSaved) / 1000; // in seconds
        if (timeDiff > 60) { // If more than a minute has passed since last save
            // Calculate resources earned while away
            let offlineProduction = {};
            
            for (const resourceType in loadedState.resources) {
                if (!loadedState.resources[resourceType]) continue;
                
                const perSecond = loadedState.resources[resourceType].perSecond || 0;
                const earned = perSecond * timeDiff;
                
                if (earned > 0) {
                    loadedState.resources[resourceType].amount += earned;
                    loadedState.resources[resourceType].totalEarned += earned;
                    
                    if (!offlineProduction[resourceType]) {
                        offlineProduction[resourceType] = 0;
                    }
                    offlineProduction[resourceType] += earned;
                }
            }
            
            // Show offline earnings notification after a small delay
            setTimeout(() => {
                let offlineMessage = 'Welcome back! You earned:';
                
                for (const resourceType in offlineProduction) {
                    if (offlineProduction[resourceType] > 0) {
                        const resourceName = loadedState.resources[resourceType].name;
                        offlineMessage += `<br>${formatNumber(Math.floor(offlineProduction[resourceType]))} ${resourceName}`;
                    }
                }
                
                showNotification(offlineMessage);
            }, 1000);
        }
        
        // Restore gameState
        Object.assign(gameState, loadedState);
    }
}

// Initialize the game when the page loads
window.onload = initGame;