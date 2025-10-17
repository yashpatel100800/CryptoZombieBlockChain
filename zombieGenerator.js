// CryptoZombies SVG Generator
// Generates unique zombie SVGs based on DNA

function generateZombieSVG(dna) {
    // Convert DNA to string and pad to ensure we have enough digits
    const dnaStr = dna.toString().padEnd(16, '0');
    
    // Parse DNA digits for different traits
    const headChoice = parseInt(dnaStr.substring(0, 2)) % 7;
    const eyeChoice = parseInt(dnaStr.substring(2, 4)) % 11;
    const shirtChoice = parseInt(dnaStr.substring(4, 6)) % 6;
    const skinColorChoice = parseInt(dnaStr.substring(6, 8)) % 100;
    const eyeColorChoice = parseInt(dnaStr.substring(8, 10)) % 100;
    const clothesColorChoice = parseInt(dnaStr.substring(10, 12)) % 100;
    const zombieNameEnding = parseInt(dnaStr.substring(12, 14)) % 6;
    
    // Color palettes
    const skinColors = [
        '#a5c882', '#7fc87f', '#6fb583', '#5aa05a', '#8db88d', '#6fbc6f',
        '#95d895', '#5fbc5f', '#7ab87a', '#8fbc8f'
    ];
    
    const eyeColors = [
        '#000000', '#1a1a1a', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
        '#ff00ff', '#00ffff', '#ffffff', '#808080'
    ];
    
    const clothesColors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6ab04c', '#eb4d4b',
        '#f0932b', '#686de0', '#95afc0', '#535c68'
    ];
    
    const skinColor = skinColors[skinColorChoice % skinColors.length];
    const eyeColor = eyeColors[eyeColorChoice % eyeColors.length];
    const clothesColor = clothesColors[clothesColorChoice % clothesColors.length];
    
    // Head shapes
    const heads = {
        0: `<ellipse cx="180" cy="140" rx="100" ry="120" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        1: `<rect x="80" y="20" width="200" height="240" rx="20" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        2: `<path d="M 80 100 Q 80 20, 180 20 Q 280 20, 280 100 L 280 200 Q 280 260, 180 260 Q 80 260, 80 200 Z" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        3: `<polygon points="180,20 280,100 280,200 180,280 80,200 80,100" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        4: `<circle cx="180" cy="140" r="110" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        5: `<path d="M 90 140 Q 90 40, 180 40 Q 270 40, 270 140 Q 270 240, 180 240 Q 90 240, 90 140 Z" fill="${skinColor}" stroke="#000" stroke-width="3"/>`,
        6: `<ellipse cx="180" cy="140" rx="110" ry="100" fill="${skinColor}" stroke="#000" stroke-width="3"/>`
    };
    
    // Eye styles
    const eyes = {
        0: `<circle cx="140" cy="120" r="15" fill="${eyeColor}"/><circle cx="220" cy="120" r="15" fill="${eyeColor}"/>`,
        1: `<rect x="125" y="110" width="30" height="20" fill="${eyeColor}"/><rect x="205" y="110" width="30" height="20" fill="${eyeColor}"/>`,
        2: `<ellipse cx="140" cy="120" rx="20" ry="15" fill="${eyeColor}"/><ellipse cx="220" cy="120" rx="20" ry="15" fill="${eyeColor}"/>`,
        3: `<circle cx="140" cy="120" r="20" fill="white"/><circle cx="145" cy="120" r="12" fill="${eyeColor}"/><circle cx="220" cy="120" r="20" fill="white"/><circle cx="225" cy="120" r="12" fill="${eyeColor}"/>`,
        4: `<path d="M 120 120 L 160 120" stroke="${eyeColor}" stroke-width="8" stroke-linecap="round"/><path d="M 200 120 L 240 120" stroke="${eyeColor}" stroke-width="8" stroke-linecap="round"/>`,
        5: `<polygon points="140,110 150,130 130,130" fill="${eyeColor}"/><polygon points="220,110 230,130 210,130" fill="${eyeColor}"/>`,
        6: `<circle cx="140" cy="120" r="18" fill="white"/><circle cx="140" cy="120" r="10" fill="${eyeColor}"/><circle cx="136" cy="116" r="4" fill="white"/><circle cx="220" cy="120" r="18" fill="white"/><circle cx="220" cy="120" r="10" fill="${eyeColor}"/><circle cx="216" cy="116" r="4" fill="white"/>`,
        7: `<ellipse cx="140" cy="120" rx="25" ry="18" fill="white"/><circle cx="148" cy="120" r="10" fill="${eyeColor}"/><ellipse cx="220" cy="120" rx="25" ry="18" fill="white"/><circle cx="228" cy="120" r="10" fill="${eyeColor}"/>`,
        8: `<rect x="120" y="110" width="40" height="20" rx="10" fill="white"/><circle cx="145" cy="120" r="8" fill="${eyeColor}"/><rect x="200" y="110" width="40" height="20" rx="10" fill="white"/><circle cx="225" cy="120" r="8" fill="${eyeColor}"/>`,
        9: `<circle cx="140" cy="120" r="15" fill="#ff0000" opacity="0.8"/><circle cx="140" cy="120" r="8" fill="${eyeColor}"/><circle cx="220" cy="120" r="15" fill="#ff0000" opacity="0.8"/><circle cx="220" cy="120" r="8" fill="${eyeColor}"/>`,
        10: `<path d="M 125 115 Q 140 105, 155 115" stroke="${eyeColor}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="140" cy="125" r="8" fill="${eyeColor}"/><path d="M 205 115 Q 220 105, 235 115" stroke="${eyeColor}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="220" cy="125" r="8" fill="${eyeColor}"/>`
    };
    
    // Mouth styles
    const mouths = [
        `<path d="M 130 180 Q 180 200, 230 180" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        `<path d="M 130 180 Q 180 160, 230 180" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        `<rect x="140" y="175" width="80" height="15" rx="7" fill="#000"/>`,
        `<ellipse cx="180" cy="185" rx="40" ry="20" fill="#000"/>`,
        `<path d="M 140 180 L 220 180" stroke="#000" stroke-width="5" stroke-linecap="round"/>`,
        `<path d="M 130 175 Q 180 195, 230 175" stroke="#000" stroke-width="3" fill="none"/><path d="M 130 185 Q 180 205, 230 185" stroke="#000" stroke-width="3" fill="none"/>`
    ];
    
    // Shirt styles
    const shirts = {
        0: `<rect x="80" y="260" width="200" height="100" fill="${clothesColor}" stroke="#000" stroke-width="3"/>
            <polygon points="180,280 160,320 200,320" fill="${clothesColor}" opacity="0.7"/>`,
        1: `<path d="M 80 280 L 80 360 L 280 360 L 280 280 L 250 260 L 220 280 L 140 280 L 110 260 Z" fill="${clothesColor}" stroke="#000" stroke-width="3"/>`,
        2: `<rect x="80" y="260" width="200" height="100" rx="15" fill="${clothesColor}" stroke="#000" stroke-width="3"/>
            <line x1="180" y1="260" x2="180" y2="360" stroke="#000" stroke-width="2"/>`,
        3: `<path d="M 90 270 L 90 360 L 270 360 L 270 270 L 240 250 L 210 270 L 150 270 L 120 250 Z" fill="${clothesColor}" stroke="#000" stroke-width="3"/>
            <rect x="160" y="280" width="40" height="50" fill="#ffffff" opacity="0.8"/>`,
        4: `<ellipse cx="180" cy="310" rx="100" ry="50" fill="${clothesColor}" stroke="#000" stroke-width="3"/>
            <rect x="140" y="280" width="80" height="20" fill="${clothesColor}" stroke="#000" stroke-width="2"/>`,
        5: `<polygon points="80,280 100,260 140,260 160,280 200,280 220,260 260,260 280,280 280,360 80,360" fill="${clothesColor}" stroke="#000" stroke-width="3"/>
            <circle cx="140" cy="310" r="8" fill="#000"/><circle cx="180" cy="310" r="8" fill="#000"/><circle cx="220" cy="310" r="8" fill="#000"/>`
    };
    
    const mouth = mouths[headChoice % mouths.length];
    
    // Assemble the SVG
    const svg = `
        <svg width="360" height="360" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="360" height="360" fill="#1a1a2e"/>
            
            <!-- Body/Shirt -->
            ${shirts[shirtChoice]}
            
            <!-- Head -->
            ${heads[headChoice]}
            
            <!-- Eyes -->
            ${eyes[eyeChoice]}
            
            <!-- Mouth -->
            ${mouth}
            
            <!-- Additional details -->
            <circle cx="140" cy="100" r="3" fill="#ffffff" opacity="0.6"/>
            <circle cx="220" cy="100" r="3" fill="#ffffff" opacity="0.6"/>
        </svg>
    `;
    
    return svg;
}

// Function to get base64 encoded SVG for use in img src
function getZombieImageURL(dna) {
    const svg = generateZombieSVG(dna);
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${base64}`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateZombieSVG, getZombieImageURL };
}
