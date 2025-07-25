// Global state
let currentPage = 'dashboard';
let systemScore = 85;
let metrics = {
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89
};
let dashboardMetrics = {
    activeServices: 12,
    connectedUsers: 847,
    systemHealth: 98,
    alerts: 3
};

// Navigation functionality
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-page');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage + '-page').classList.add('active');
            
            currentPage = targetPage;
            
            // Update URL without page reload
            window.history.pushState({}, '', targetPage === 'dashboard' ? '/' : '/' + targetPage);
        });
    });
}

// Dashboard functionality
function updateDashboardMetrics() {
    // Simulate real-time updates
    dashboardMetrics.connectedUsers += Math.floor(Math.random() * 10) - 5;
    dashboardMetrics.systemHealth = Math.max(90, Math.min(100, dashboardMetrics.systemHealth + (Math.random() - 0.5) * 2));
    
    document.getElementById('active-services').textContent = dashboardMetrics.activeServices;
    document.getElementById('connected-users').textContent = dashboardMetrics.connectedUsers;
    document.getElementById('system-health').textContent = Math.round(dashboardMetrics.systemHealth) + '%';
    document.getElementById('alerts').textContent = dashboardMetrics.alerts;
    
    // Update system score based on health
    systemScore = Math.round(dashboardMetrics.systemHealth * 0.85);
    updateSystemScore();
}

function updateSystemScore() {
    const scoreBadge = document.getElementById('score-badge');
    const scoreProgress = document.getElementById('score-progress');
    
    if (scoreBadge) {
        scoreBadge.textContent = systemScore;
        scoreBadge.className = 'score-badge';
        
        if (systemScore > 80) {
            scoreBadge.style.background = 'hsl(142.1, 76.2%, 36.3%)';
        } else if (systemScore > 60) {
            scoreBadge.style.background = 'hsl(47.9, 95.8%, 53.1%)';
        } else {
            scoreBadge.style.background = 'hsl(0, 84.2%, 60.2%)';
        }
    }
    
    if (scoreProgress) {
        scoreProgress.style.width = systemScore + '%';
    }
}

function performAction(actionName) {
    // Simulate action effects
    switch (actionName) {
        case 'Deploy New Service':
            dashboardMetrics.activeServices++;
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 2);
            break;
        case 'Create Backup':
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 1);
            break;
        case 'Monitor Logs':
            dashboardMetrics.alerts = Math.max(0, dashboardMetrics.alerts - 1);
            break;
        case 'Security Scan':
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 3);
            dashboardMetrics.alerts = Math.max(0, dashboardMetrics.alerts - 2);
            break;
    }
    
    updateDashboardMetrics();
    showToast(actionName, `Successfully executed ${actionName.toLowerCase()}`);
}

// Configuration functionality
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.getAttribute('data-service');
            openServiceConfig(serviceName);
            
            // Update active state
            serviceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

function openServiceConfig(serviceName) {
    const configPanel = document.getElementById('service-config');
    const configTitle = document.getElementById('config-title');
    const serviceNameInput = document.getElementById('service-name');
    
    configTitle.textContent = serviceName.charAt(0).toUpperCase() + serviceName.slice(1) + ' Configuration';
    serviceNameInput.value = serviceName.charAt(0).toUpperCase() + serviceName.slice(1) + ' Service';
    
    configPanel.classList.remove('hidden');
    
    // Scroll to config panel
    configPanel.scrollIntoView({ behavior: 'smooth' });
}

function closeConfig() {
    const configPanel = document.getElementById('service-config');
    const serviceCards = document.querySelectorAll('.service-card');
    
    configPanel.classList.add('hidden');
    serviceCards.forEach(card => card.classList.remove('active'));
}

function saveConfig() {
    const serviceName = document.getElementById('service-name').value;
    const configType = document.getElementById('service-config-select').value;
    const autoScaling = document.getElementById('auto-scaling').checked;
    
    // Simulate configuration save
    dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 1);
    updateDashboardMetrics();
    
    showToast('Configuration Saved', `${serviceName} has been configured with ${configType} settings`);
    closeConfig();
}

function resetConfig() {
    document.getElementById('service-name').value = '';
    document.getElementById('service-config-select').value = 'basic';
    document.getElementById('auto-scaling').checked = false;
    
    showToast('Configuration Reset', 'All settings have been reset to default values');
}

// Control Center functionality
function updateControlMetrics() {
    // Update metrics with random variations
    Object.keys(metrics).forEach(key => {
        metrics[key] = Math.max(0, Math.min(100, metrics[key] + (Math.random() - 0.5) * 10));
    });
    
    // Update progress bars
    document.getElementById('cpu-progress').style.width = metrics.cpu + '%';
    document.getElementById('memory-progress').style.width = metrics.memory + '%';
    document.getElementById('disk-progress').style.width = metrics.disk + '%';
    document.getElementById('network-progress').style.width = metrics.network + '%';
    
    // Update metric values
    document.querySelector('[data-metric="cpu"] .metric-value').textContent = metrics.cpu.toFixed(1) + '%';
    document.querySelector('[data-metric="memory"] .metric-value').textContent = metrics.memory.toFixed(1) + '%';
    document.querySelector('[data-metric="disk"] .metric-value').textContent = metrics.disk.toFixed(1) + '%';
    document.querySelector('[data-metric="network"] .metric-value').textContent = metrics.network.toFixed(1) + '%';
    
    // Calculate system score
    const avgScore = Object.values(metrics).reduce((acc, val) => {
        const normalizedScore = val > 80 ? 60 - val : val > 60 ? 80 - val : 100 - val;
        return acc + Math.max(0, normalizedScore);
    }, 0) / Object.keys(metrics).length;
    
    systemScore = Math.round(avgScore);
    
    // Update system score display
    const systemScoreElement = document.getElementById('system-score');
    if (systemScoreElement) {
        systemScoreElement.textContent = systemScore;
        systemScoreElement.className = 'score-badge';
        
        if (systemScore > 80) {
            systemScoreElement.style.background = 'hsl(142.1, 76.2%, 36.3%)';
        } else if (systemScore > 60) {
            systemScoreElement.style.background = 'hsl(47.9, 95.8%, 53.1%)';
        } else {
            systemScoreElement.style.background = 'hsl(0, 84.2%, 60.2%)';
        }
    }
    
    // Update dashboard score if on dashboard
    updateSystemScore();
}

function restartAgent(agentName) {
    // Simulate agent restart effect
    dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 2);
    updateDashboardMetrics();
    
    showToast('Agent Restarted', `${agentName} has been successfully restarted`);
}

function performControlAction(actionName) {
    // Simulate control action effects
    switch (actionName) {
        case 'Refresh All':
            Object.keys(metrics).forEach(key => {
                metrics[key] = Math.max(0, metrics[key] - Math.random() * 20);
            });
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 5);
            break;
        case 'Create Backup':
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 2);
            break;
        case 'Security Scan':
            dashboardMetrics.systemHealth = Math.min(100, dashboardMetrics.systemHealth + 3);
            dashboardMetrics.alerts = Math.max(0, dashboardMetrics.alerts - 1);
            break;
    }
    
    updateControlMetrics();
    updateDashboardMetrics();
    showToast(actionName, `Successfully executed ${actionName.toLowerCase()}`);
}

// Toast notification system
function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.querySelector('.toast-title');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastIcon.className = 'toast-icon fas fa-check-circle';
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideToast();
    }, 4000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 300);
}

// Real-time updates
function startRealTimeUpdates() {
    // Update metrics every 3 seconds
    setInterval(() => {
        if (currentPage === 'dashboard') {
            updateDashboardMetrics();
        } else if (currentPage === 'control') {
            updateControlMetrics();
        }
    }, 3000);
    
    // Update control metrics every 2 seconds when on control page
    setInterval(() => {
        if (currentPage === 'control') {
            updateControlMetrics();
        }
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initServiceCards();
    
    // Set initial metric values
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach((item, index) => {
        const keys = Object.keys(metrics);
        if (keys[index]) {
            item.setAttribute('data-metric', keys[index]);
            const valueElement = item.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = metrics[keys[index]].toFixed(1) + '%';
            }
        }
    });
    
    // Start real-time updates
    startRealTimeUpdates();
    
    // Initial updates
    updateDashboardMetrics();
    updateSystemScore();
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const path = window.location.pathname;
        let targetPage = 'dashboard';
        
        if (path.includes('configuration')) {
            targetPage = 'configuration';
        } else if (path.includes('control')) {
            targetPage = 'control';
        }
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-page') === targetPage);
        });
        
        // Show correct page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.toggle('active', page.id === targetPage + '-page');
        });
        
        currentPage = targetPage;
    });
    
    // Set initial page based on URL
    const initialPath = window.location.pathname;
    if (initialPath.includes('configuration')) {
        document.querySelector('[data-page="configuration"]').click();
    } else if (initialPath.includes('control')) {
        document.querySelector('[data-page="control"]').click();
    }
});

// Global functions for onclick handlers
window.performAction = performAction;
window.closeConfig = closeConfig;
window.saveConfig = saveConfig;
window.resetConfig = resetConfig;
window.restartAgent = restartAgent;
window.performControlAction = performControlAction;
window.hideToast = hideToast;