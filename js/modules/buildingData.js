// Building data module

export const buildings = [
    // TIER 1 BUILDINGS
    {
        id: 'mineral-extractor',
        name: 'Manual Mineral Extractor',
        description: 'Basic equipment to extract minerals from Martian soil',
        cost: {
            minerals: 10
        },
        production: {
            minerals: 0.2
        },
        owned: 0,
        unlocked: true,
        category: 'resource',
        tier: 1
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
        category: 'power',
        tier: 1
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
        category: 'resource',
        tier: 1
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
            science: 0.1,
            oxygen: 0.1
        },
        owned: 0,
        unlocked: true,
        category: 'life-support',
        tier: 1
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
        consumption: {
            oxygen: 0.2
        },
        owned: 0,
        unlocked: true,
        category: 'habitat',
        tier: 1
    },
    
    // TIER 2 BUILDINGS
    {
        id: 'electric-drill',
        name: 'Electric Mineral Drill',
        description: 'More powerful electrically-powered mineral extraction',
        cost: {
            minerals: 120,
            energy: 25,
            science: 30
        },
        production: {
            minerals: 0.8
        },
        owned: 0,
        unlocked: false,
        category: 'resource',
        tier: 2
    },
    {
        id: 'water-pump',
        name: 'Deep Water Pump',
        description: 'Extracts water from deeper ice deposits',
        cost: {
            minerals: 150,
            energy: 30,
            science: 35
        },
        production: {
            water: 0.7
        },
        owned: 0,
        unlocked: false,
        category: 'resource',
        tier: 2
    },
    {
        id: 'material-processor',
        name: 'Material Processor',
        description: 'Converts raw minerals into advanced building materials',
        cost: {
            minerals: 200,
            energy: 50,
            science: 40
        },
        production: {
            materials: 0.3
        },
        consumption: {
            minerals: 0.5
        },
        owned: 0,
        unlocked: false,
        category: 'production',
        tier: 2
    },
    {
        id: 'solar-array',
        name: 'Solar Array',
        description: 'Advanced solar collection system',
        cost: {
            minerals: 180,
            materials: 20,
            science: 45
        },
        production: {
            energy: 1.2
        },
        owned: 0,
        unlocked: false,
        category: 'power',
        tier: 2
    },
    {
        id: 'oxygen-generator',
        name: 'Electrolysis Unit',
        description: 'Generates oxygen through water electrolysis',
        cost: {
            minerals: 160,
            energy: 40,
            science: 50
        },
        production: {
            oxygen: 0.8
        },
        consumption: {
            water: 0.2,
            energy: 0.3
        },
        owned: 0,
        unlocked: false,
        category: 'life-support',
        tier: 2
    },
    {
        id: 'research-lab',
        name: 'Research Laboratory',
        description: 'Advanced facility for scientific research',
        cost: {
            minerals: 200,
            materials: 30,
            water: 40,
            energy: 50,
            food: 30
        },
        production: {
            science: 1.5
        },
        consumption: {
            energy: 0.5
        },
        owned: 0,
        unlocked: false,
        category: 'science',
        tier: 2
    },
    
    // TIER 3+ BUILDINGS - These are just samples
    {
        id: 'hydroponics-bay',
        name: 'Hydroponics Bay',
        description: 'Efficient food production system',
        cost: {
            minerals: 300,
            materials: 50,
            water: 100,
            energy: 80
        },
        production: {
            food: 2.0,
            oxygen: 0.5
        },
        consumption: {
            water: 0.5,
            energy: 0.6
        },
        owned: 0,
        unlocked: false,
        category: 'life-support',
        tier: 3
    },
    // ... Add more buildings from the original file
]; 