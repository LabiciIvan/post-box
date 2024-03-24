const listData = {
    house: [
        {
            "id": 0,
            "name": "Kitchen",
            "stove": "Turn off the gas after cooking.",
            "sink": "Check for any leaks under the sink.",
            "refrigerator": "Ensure the refrigerator door is properly closed."
        },
        {
            "id": 1,
            "name": "Living Room",
            "television": "Remember to switch off the TV when not in use.",
            "couch": "Fluff cushions for a neat appearance.",
            "coffee_table": "Remove any spills or stains immediately."
        },
        {
            "id": 2,
            "name": "Bedroom",
            "bed": "Make the bed every morning for a tidy room.",
            "lamp": "Replace light bulbs when they burn out.",
            "nightstand": "Keep essentials like water and books nearby."
        },
        {
            "id": 3,
            "name": "Bathroom",
            "shower": "Clean the shower drain regularly to prevent clogging.",
            "toilet": "Flush after use and ensure it's clean.",
            "mirror": "Wipe down the mirror for a clear reflection."
        },
        {
            "id": 4,
            "name": "Dining Room",
            "dining_table": "Wipe down the table after each meal.",
            "chairs": "Check for any loose screws or instability.",
            "buffet": "Dust and organize items on the buffet regularly."
        },
        {
            "id": 5,
            "name": "Laundry Room",
            "washing_machine": "Clean the lint filter after each use.",
            "dryer": "Remove lint from the dryer vent to prevent fire hazards.",
            "detergent": "Ensure there's always enough detergent."
        },
        {
            "id": 6,
            "name": "Room",
            "desk": "Keep the desk clutter-free for better focus.",
            "computer": "Restart your computer regularly for optimal performance.",
            "bookshelf": "Organize books and materials for easy access."
        },
        {
            "id": 7,
            "name": "Attic",
            "storage_boxes": "Label storage boxes for easy identification.",
            "insulation": "Check insulation for any signs of wear or damage.",
            "light_fixture": "Ensure proper lighting for safety when accessing the attic."
        },
        {
            "id": 8,
            "name": "Basement",
            "furnace": "Schedule regular maintenance for the furnace.",
            "water_heater": "Check for leaks or signs of corrosion.",
            "sump_pump": "Test the sump pump periodically, especially before rainy seasons."
        },
        {
            "id": 9,
            "name": "Garage",
            "car": "Keep the car's maintenance schedule up to date.",
            "tools": "Organize tools for easy access and safety.",
            "garage_door": "Ensure the garage door opener is functioning properly."
        },
        {
            "id": 10,
            "name": "Patio",
            "patio_furniture": "Cover patio furniture during harsh weather.",
            "grill": "Clean the grill after each use for longevity.",
            "potted_plants": "Water potted plants regularly to keep them healthy."

        },
        {
            "id": 11,
            "name": "Backyard",
            "lawn_mower": "Regularly mow the lawn for a neat appearance.",
            "garden_shed": "Organize gardening tools in the shed.",
            "fence": "Inspect the fence for any damage or loose boards."

        },
        {
            "id": 12,
            "name": "Hallway",
            "mirror": "Clean and polish the hallway mirror for a bright entrance.",
            "coat_rack": "Keep the coat rack clear of clutter.",
            "shoe_rack": "Organize shoes neatly on the shoe rack."
        },
        {
            "id": 13,
            "name": "Front Porch",
            "porch_swing": "Oil the hinges of the porch swing regularly.",
            "welcome_mat": "Clean the welcome mat to keep the entrance inviting.",

        },
        {
            "id": 14,
            "name": "Closet",
            "clothes": "Donate clothes you no longer wear.",
            "shoes": "Keep shoes organized with shoe racks or boxes.",
            "hangers": "Use sturdy hangers to maintain the shape of clothes."
        }
    ],
    garden: [
        {
          "id": 0,
          "name": "Pruning Shears",
          "blade_material": "Stainless steel for durability",
          "cutting_capacity": "Cuts branches up to 1 inch thick",
          "note": "Regularly clean and oil blades for smooth cutting"
        },
        {
          "id": 1,
          "name": "Watering Can",
          "capacity": "Holds 2 gallons of water",
          "spout_type": "Long and narrow spout for precise watering",
          "note": "Empty and dry after each use to prevent mold growth"
        },
        {
          "id": 2,
          "name": "Gardening Gloves",
          "material": "Breathable and durable synthetic leather",
          "grip": "Textured palms for a secure grip on tools",
          "note": "Wash gloves regularly to remove dirt and bacteria"
        },
        {
          "id": 3,
          "name": "Shovel",
          "blade_type": "Pointed blade for digging",
          "handle_length": "D-handle for comfortable grip and leverage",
          "note": "Store shovel in a dry area to prevent rust"
        },
        {
          "id": 4,
          "name": "Trowel",
          "blade_material": "Rust-resistant stainless steel",
          "handle_type": "Ergonomic handle for comfortable use",
          "note": "Use trowel for planting small bulbs and seedlings"
        },
        {
          "id": 5,
          "name": "Rake",
          "head_width": "24 inches wide",
          "tine_material": "Steel for durability",
          "note": "Use rake for removing leaves and debris from lawn"
        },
        {
          "id": 6,
          "name": "Garden Hose",
          "length": "50 feet long",
          "material": "Flexible and kink-resistant rubber",
          "note": "Store hose on a reel to prevent tangling"
        },
        {
          "id": 7,
          "name": "Pruning Saw",
          "blade_length": "10 inches long",
          "teeth_per_inch": "Triple-ground teeth for efficient cutting",
          "note": "Use saw for cutting thicker branches and limbs"
        },
        {
          "id": 8,
          "name": "Planting Pots",
          "material": "Durable plastic",
          "drainage_holes": "Multiple holes for proper drainage",
          "note": "Select pots with adequate drainage for healthy plants"
        },
        {
          "id": 9,
          "name": "Garden Cart",
          "capacity": "200 pounds",
          "wheels": "Four pneumatic wheels for easy maneuverability",
          "note": "Use cart for transporting soil, plants, and tools"
        },
        {
          "id": 10,
          "name": "Garden Fork",
          "prongs": "Four sturdy prongs",
          "handle_material": "Wooden handle for comfort",
          "note": "Use fork for turning and aerating soil"
        },
        {
          "id": 11,
          "name": "Hoe",
          "blade_material": "Carbon steel",
          "handle_length": "Long handle for comfortable use",
          "note": "Use hoe for removing weeds and cultivating soil"
        },
        {
          "id": 12,
          "name": "Garden Sprayer",
          "capacity": "1 gallon",
          "nozzle_type": "Adjustable nozzle for different spray patterns",
          "note": "Clean sprayer after each use to prevent clogs"
        },
        {
          "id": 13,
          "name": "Garden Tiller",
          "engine_type": "Gas-powered engine",
          "tilling_width": "16 inches wide",
          "note": "Till soil before planting to loosen and aerate"
        },
        {
          "id": 14,
          "name": "Seedling Heat Mat",
          "size": "Standard 20 x 10 inches",
          "temperature_range": "Maintains soil temperature between 70-85°F",
          "note": "Use heat mat to promote seed germination and rooting"
        },
        {
          "id": 15,
          "name": "Garden Sprinkler",
          "coverage": "Covers up to 4,000 square feet",
          "spray_patterns": "Adjustable spray patterns",
          "note": "Water lawn and garden evenly with sprinkler"
        },
        {
          "id": 16,
          "name": "Garden Kneeler",
          "material": "Foam padding for comfort",
          "folding": "Folds for easy storage",
          "note": "Protect knees and clothes while gardening"
        },
        {
          "id": 17,
          "name": "Garden Edging",
          "material": "Durable plastic",
          "length": "20 feet",
          "note": "Use edging to define borders and keep grass from spreading"
        },
        {
          "id": 18,
          "name": "Mulch",
          "type": "Organic mulch",
          "color": "Dark brown",
          "note": "Spread mulch around plants to retain moisture and suppress weeds"
        },
        {
          "id": 19,
          "name": "Garden Gloves",
          "material": "Nitrile-coated fabric",
          "dexterity": "Provides good dexterity for handling plants",
          "note": "Protect hands from thorns and dirt while gardening"
        }
    ],
    school: [
        {
          "id": 0,
          "name": "Backpack",
          "material": "Durable polyester",
          "capacity": "Fits laptops up to 15 inches",
          "note": "Adjust shoulder straps for comfortable carrying"
        },
        {
          "id": 1,
          "name": "Notebooks",
          "pages": "100 sheets per notebook",
          "paper_type": "College-ruled",
          "note": "Label notebooks for easy organization"
        },
        {
          "id": 2,
          "name": "Pencils",
          "lead_type": "No. 2 HB",
          "eraser": "Latex-free eraser",
          "note": "Sharpen pencils before class for precise writing"
        },
        {
          "id": 3,
          "name": "Laptop",
          "screen_size": "13.3 inches",
          "RAM": "8GB DDR4",
          "note": "Update software regularly for security and performance"
        },
        {
          "id": 4,
          "name": "Calculator",
          "type": "Scientific calculator",
          "functions": "Trigonometric functions, logarithms",
          "note": "Replace batteries as needed to maintain functionality"
        },
        {
          "id": 5,
          "name": "Textbooks",
          "subject": "Mathematics",
          "edition": "5th Edition",
          "note": "Cover textbooks to protect against wear and tear"
        },
        {
          "id": 6,
          "name": "Highlighters",
          "colors": "Assorted colors",
          "chisel_tip": "Chisel tip for precise highlighting",
          "note": "Use highlighters to mark key points in textbooks"
        },
        {
          "id": 7,
          "name": "Binders",
          "capacity": "1-inch rings",
          "material": "Durable polypropylene",
          "note": "Label binders for each subject for easy organization"
        },
        {
          "id": 8,
          "name": "USB Flash Drive",
          "storage_capacity": "32GB",
          "compatibility": "USB 3.0",
          "note": "Back up important files regularly to the flash drive"
        },
        {
          "id": 9,
          "name": "Water Bottle",
          "material": "BPA-free plastic",
          "capacity": "24 ounces",
          "note": "Stay hydrated throughout the day with the water bottle"
        }
    ]
}

const categoryData = [
    {
        id: 1,
        name: 'House',
        url: '/management-tool/categories/house',
        icon: 'bi bi-house icon-size',
    },
    {
        id: 2,
        name: 'Garden',
        url: '/management-tool/categories/garden',
        icon: 'bi bi-border icon-size',
    },
    {
        id: 3,
        name: 'School',
        url: '/management-tool/categories/school',
        icon: 'bi bi-building icon-size',
    }
];

export{ listData, categoryData};