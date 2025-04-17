// Main entry point for Mars Colonizer
import { gameState, initState } from './modules/gameState.js';
import { initGameLoop } from './modules/gameLoop.js';
import { loadGame, setupSaveSystem } from './modules/saveSystem.js';
import { setupClickHandlers } from './modules/clickHandlers.js';
import { updateResourcesDisplay } from './modules/resourceUI.js';
import { updateBuildingsList } from './modules/buildingUI.js';
import { updateUpgradesList } from './modules/upgradeUI.js';
import { updateMilestonesList } from './modules/milestoneUI.js';
import { updateStats } from './modules/statsUI.js';
import { initTooltips } from './modules/uiUtils.js';

// Initialize the game
function initGame() {
    // Initialize game state
    initState();
    
    // Load save game if exists
    loadGame();
    
    // Set up UI components
    updateResourcesDisplay();
    updateBuildingsList();
    updateUpgradesList();
    updateMilestonesList();
    updateStats();
    
    // Set up event handlers
    setupClickHandlers();
    setupSaveSystem();
    
    // Initialize tooltips
    initTooltips();
    
    // Start game loop
    initGameLoop();
}

// Initialize the game when the page loads
window.onload = initGame; 