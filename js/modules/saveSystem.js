// Save/Load system module
import { gameState } from './gameState.js';
import { showNotification } from './uiUtils.js';
import { formatNumber } from './uiUtils.js';

// Save game to localStorage
export function saveGame() {
    gameState.lastSaved = Date.now();
    localStorage.setItem('marsColonizerSave', JSON.stringify(gameState));
}

// Load game from localStorage
export function loadGame() {
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

// Set up save system event listeners
export function setupSaveSystem() {
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
    
    // Listen for save events
    document.addEventListener('saveGame', saveGame);
} 