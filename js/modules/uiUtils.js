// UI utilities module
import { gameState } from './gameState.js';

// Format large numbers
export function formatNumber(num) {
    if (num < 1000) return num;
    
    const units = ["K", "M", "B", "T"];
    const unit = Math.floor((num.toString().length - 1) / 3);
    
    if (unit === 0) return num;
    
    const divisor = Math.pow(1000, unit);
    const shortened = (num / divisor).toFixed(1);
    
    return `${shortened}${units[unit-1]}`;
}

// Format category name (e.g., "resource" -> "Resource Buildings")
export function formatCategoryName(category) {
    return category.charAt(0).toUpperCase() + category.slice(1) + ' Buildings';
}

// Initialize tooltips for resources
export function initTooltips() {
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

// Show notification
export function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Play sound effect
export function playSound(soundType) {
    // Only play if sounds are enabled
    if (!document.getElementById('sound-toggle') || !document.getElementById('sound-toggle').checked) return;
    
    const sound = new Audio();
    
    // Set default source and handle missing files
    let soundSrc = '';
    switch(soundType) {
        case 'click':
            soundSrc = 'sounds/click.mp3';
            sound.volume = 0.2;
            break;
        case 'purchase':
            soundSrc = 'sounds/purchase.mp3';
            sound.volume = 0.3;
            break;
        case 'milestone':
            soundSrc = 'sounds/milestone.mp3';
            sound.volume = 0.4;
            break;
        default:
            return; // No valid sound type
    }
    
    // Create placeholder sounds if actual sounds aren't available
    sound.src = soundSrc;
    sound.onerror = function() {
        // Create oscillator for basic sound effect as fallback
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            // Different sound types have different tones
            switch(soundType) {
                case 'click':
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 400;
                    gainNode.gain.value = 0.1;
                    break;
                case 'purchase':
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 600;
                    gainNode.gain.value = 0.2;
                    break;
                case 'milestone':
                    oscillator.type = 'triangle';
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.3;
                    break;
            }
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            
            // Stop after a short duration
            setTimeout(() => {
                oscillator.stop();
            }, 200);
        } catch (e) {
            console.log("Audio fallback failed: " + e);
        }
    };
    
    sound.play().catch(e => console.log("Audio play failed: " + e));
}

// Create floating text effect when clicking
export function createFloatingText(event, text) {
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