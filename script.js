const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ========== SYMPTOM TRACKER INTERACTIVITY ==========

// Mood Selector
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

// Symptom Tags
document.querySelectorAll('.symptom-tag:not(.add-symptom)').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
    });
});

// Flow Selector
document.querySelectorAll('.flow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.flow-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

// Fake community data for different birth controls
const communityData = {
    yaz: {
        name: "Yaz / Yasmin",
        users: 2847,
        symptoms: [
            { name: "Headache", emoji: "🤕", percent: 68, color: "pink", isCommon: true },
            { name: "Bloating", emoji: "😮‍💨", percent: 54, color: "purple", isCommon: true },
            { name: "Mood Swings", emoji: "😤", percent: 47, color: "rose", isCommon: true },
            { name: "Nausea", emoji: "🤢", percent: 38, color: "teal", isCommon: false },
            { name: "Fatigue", emoji: "😴", percent: 62, color: "blue", isCommon: true },
            { name: "Breast Tenderness", emoji: "💔", percent: 41, color: "orange", isCommon: false },
            { name: "Acne Improvement", emoji: "✨", percent: 72, color: "indigo", isCommon: true },
            { name: "Cramps", emoji: "😖", percent: 35, color: "pink", isCommon: false }
        ]
    },
    ortho: {
        name: "Ortho Tri-Cyclen",
        users: 1923,
        symptoms: [
            { name: "Headache", emoji: "🤕", percent: 52, color: "pink", isCommon: true },
            { name: "Nausea", emoji: "🤢", percent: 44, color: "teal", isCommon: true },
            { name: "Mood Changes", emoji: "🎭", percent: 39, color: "purple", isCommon: false },
            { name: "Weight Gain", emoji: "⚖️", percent: 33, color: "orange", isCommon: false },
            { name: "Clearer Skin", emoji: "🌟", percent: 65, color: "indigo", isCommon: true },
            { name: "Fatigue", emoji: "😴", percent: 48, color: "blue", isCommon: true },
            { name: "Bloating", emoji: "😮‍💨", percent: 42, color: "rose", isCommon: false }
        ]
    },
    loloestrin: {
        name: "Lo Loestrin Fe",
        users: 2156,
        symptoms: [
            { name: "Spotting", emoji: "🩸", percent: 58, color: "rose", isCommon: true },
            { name: "Headache", emoji: "🤕", percent: 45, color: "pink", isCommon: true },
            { name: "No Period", emoji: "📅", percent: 67, color: "indigo", isCommon: true },
            { name: "Mood Stable", emoji: "😌", percent: 71, color: "teal", isCommon: true },
            { name: "Low Bloating", emoji: "👍", percent: 63, color: "blue", isCommon: true },
            { name: "Fatigue", emoji: "😴", percent: 38, color: "purple", isCommon: false }
        ]
    },
    nuvaring: {
        name: "NuvaRing",
        users: 1654,
        symptoms: [
            { name: "Headache", emoji: "🤕", percent: 41, color: "pink", isCommon: false },
            { name: "Discharge", emoji: "💧", percent: 52, color: "blue", isCommon: true },
            { name: "Mood Stable", emoji: "😊", percent: 68, color: "teal", isCommon: true },
            { name: "Libido Change", emoji: "💕", percent: 44, color: "rose", isCommon: false },
            { name: "Bloating", emoji: "😮‍💨", percent: 36, color: "purple", isCommon: false },
            { name: "Easy to Use", emoji: "👌", percent: 78, color: "indigo", isCommon: true }
        ]
    },
    nexplanon: {
        name: "Nexplanon",
        users: 3201,
        symptoms: [
            { name: "Irregular Bleeding", emoji: "🩸", percent: 72, color: "rose", isCommon: true },
            { name: "Headache", emoji: "🤕", percent: 38, color: "pink", isCommon: false },
            { name: "Weight Change", emoji: "⚖️", percent: 45, color: "orange", isCommon: true },
            { name: "Mood Swings", emoji: "🎭", percent: 51, color: "purple", isCommon: true },
            { name: "Acne", emoji: "😔", percent: 42, color: "teal", isCommon: false },
            { name: "No Daily Pill", emoji: "🎉", percent: 94, color: "indigo", isCommon: true },
            { name: "Arm Soreness", emoji: "💪", percent: 28, color: "blue", isCommon: false }
        ]
    },
    depo: {
        name: "Depo-Provera",
        users: 1432,
        symptoms: [
            { name: "No Period", emoji: "📅", percent: 68, color: "indigo", isCommon: true },
            { name: "Weight Gain", emoji: "⚖️", percent: 57, color: "orange", isCommon: true },
            { name: "Mood Changes", emoji: "🎭", percent: 48, color: "purple", isCommon: true },
            { name: "Headache", emoji: "🤕", percent: 44, color: "pink", isCommon: false },
            { name: "Bone Density", emoji: "🦴", percent: 32, color: "teal", isCommon: false },
            { name: "Spotting", emoji: "🩸", percent: 53, color: "rose", isCommon: true }
        ]
    },
    mirena: {
        name: "Mirena IUD",
        users: 4128,
        symptoms: [
            { name: "Lighter Periods", emoji: "✨", percent: 81, color: "indigo", isCommon: true },
            { name: "Cramping", emoji: "😖", percent: 62, color: "rose", isCommon: true },
            { name: "Spotting", emoji: "🩸", percent: 48, color: "pink", isCommon: true },
            { name: "Mood Stable", emoji: "😊", percent: 74, color: "teal", isCommon: true },
            { name: "Headache", emoji: "🤕", percent: 29, color: "purple", isCommon: false },
            { name: "Long Lasting", emoji: "⏰", percent: 96, color: "blue", isCommon: true },
            { name: "Acne", emoji: "😔", percent: 35, color: "orange", isCommon: false }
        ]
    }
};

// Generate bubbles
function generateBubbles(bcType) {
    const container = document.getElementById('bubbleContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const data = communityData[bcType] || communityData.yaz;
    const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-tag.selected'))
        .map(tag => tag.textContent.toLowerCase());
    
    // Update badge and user count
    const bcBadge = document.getElementById('bcBadge');
    const userCount = document.getElementById('userCount');
    if (bcBadge) bcBadge.textContent = data.name + ' Users';
    if (userCount) userCount.textContent = data.users.toLocaleString();
    
    // Position bubbles in a nice layout
    const positions = [
        { x: 15, y: 25 }, { x: 70, y: 20 }, { x: 45, y: 55 },
        { x: 20, y: 70 }, { x: 75, y: 65 }, { x: 50, y: 20 },
        { x: 30, y: 45 }, { x: 65, y: 45 }
    ];
    
    data.symptoms.forEach((symptom, index) => {
        const bubble = document.createElement('div');
        const size = 60 + (symptom.percent * 0.6); // Size based on percentage
        const pos = positions[index % positions.length];
        
        // Check if this is one of user's symptoms
        const isUserSymptom = selectedSymptoms.some(s => 
            symptom.name.toLowerCase().includes(s) || s.includes(symptom.name.toLowerCase())
        );
        
        bubble.className = `symptom-bubble ${symptom.color}${isUserSymptom ? ' yours' : ''}`;
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: calc(${pos.x}% - ${size/2}px);
            top: calc(${pos.y}% - ${size/2}px);
            animation-duration: ${3 + Math.random() * 2}s;
        `;
        
        bubble.innerHTML = `
            <span class="bubble-emoji">${symptom.emoji}</span>
            <span class="bubble-name">${symptom.name}</span>
            <span class="bubble-percent">${symptom.percent}%</span>
        `;
        
        // Tooltip on hover
        bubble.title = `${symptom.percent}% of ${data.name} users report ${symptom.name}`;
        
        container.appendChild(bubble);
    });
}

// Save Log Button with Community Comparison
const saveLogBtn = document.querySelector('.save-log-btn');
if (saveLogBtn) {
    saveLogBtn.addEventListener('click', () => {
        // Get selected values
        const mood = document.querySelector('.mood-btn.selected')?.dataset.mood || 'none';
        const energy = document.getElementById('energySlider')?.value || 3;
        const symptoms = Array.from(document.querySelectorAll('.symptom-tag.selected'))
            .map(tag => tag.textContent);
        const flow = document.querySelector('.flow-btn.selected')?.dataset.flow || 'none';
        const notes = document.querySelector('.notes-input')?.value || '';
        const bcType = document.getElementById('bcSelect')?.value || 'yaz';
        
        // Show confirmation
        saveLogBtn.innerHTML = '<span>✅</span> Saved! Loading comparison...';
        saveLogBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Show community card with bubbles
        setTimeout(() => {
            const communityCard = document.getElementById('communityCard');
            if (communityCard) {
                communityCard.style.display = 'block';
                generateBubbles(bcType);
                communityCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            saveLogBtn.innerHTML = '<span>💾</span> Save & Compare with Community';
            saveLogBtn.style.background = 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)';
        }, 1000);
        
        console.log('Log saved:', { mood, energy, symptoms, flow, notes, bcType });
    });
}

// Update bubbles when BC selection changes
const bcSelect = document.getElementById('bcSelect');
if (bcSelect) {
    bcSelect.addEventListener('change', () => {
        const communityCard = document.getElementById('communityCard');
        if (communityCard && communityCard.style.display !== 'none') {
            generateBubbles(bcSelect.value);
        }
    });
}

// Add Symptom Button
const addSymptomBtn = document.querySelector('.add-symptom');
if (addSymptomBtn) {
    addSymptomBtn.addEventListener('click', () => {
        const newSymptom = prompt('Enter new symptom:');
        if (newSymptom && newSymptom.trim()) {
            const newTag = document.createElement('button');
            newTag.className = 'symptom-tag selected';
            newTag.textContent = newSymptom.trim();
            newTag.addEventListener('click', () => newTag.classList.toggle('selected'));
            addSymptomBtn.parentNode.insertBefore(newTag, addSymptomBtn);
        }
    });
}

