const trails = [
    {
        "name": "Your First Story",
        "difficulty": 0,
        "description": "This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics! You'll learn about how to use the Twine interface, how to write and test the different parts of your story, how to link scenes together, and how to create a simple choose-your-own-adventure-style story that offers choices for the reader than affect the outcome.",
        "path": "your-first-story",
        "locations": [
            // "your-first-story-trailhead",
            "start-a-story",
            "create-passage",
            "link-passages",
            "branching-paths",
            "story-with-multiple-endings"
        ],
    },
    // {
    //   "name": "Cover Art",
    //   "difficulty": 0,
    //   "description": "This trail is about embedding images, formatting text, and making your passages look amazing. Follow this trail to learn how to change the look of your story.",
    //   "path": "cover-art",
    //   "locations": [
  
    //   ]
    // },
    // {
    //     "name": "Dungeon Crawler",
    //     "difficulty": 3,
    //     "description": "Create a text-based game where the reader explores a labrynthine maze, avoiding dangers and solving puzzles to fulfill their quest.",
    //     "path": "dungeon-crawler",
    //     "locations": [],
    // },
    {
        "name": "Oral History",
        "difficulty": 1,
        "description": "Pick a friend, family member, or community member and tell their story using audio recordings. Create a Twine story where the reader can explore the events and stories captured in your recordings.",
        "path": "audio-fiction",
        "locations": [
            // TODO: add optional context/description to locations -- not all of them make sense in context
            "oral-history-trailhead",
            "making-recordings",
            "hosting-recordings",
            "add-audio",
            "delay-text",
            "investigating-branches",
            "oral-history-landmark"
        ],
    },
    {
        "name": "Museum Walk",
        "difficulty": 2,
        "description": "Create a Twine story that lets the reader explore events from the past. Use images, recordings, and writing to help readers explore a place out of a different time.",
        "path": "museum-walk",
        "locations": [
            "museum-walk-trailhead",
            "add-images",
            "add-video",
            "finding-sources",
            "museum-walk-landmark"
        ]
    },
    {
        "name": "Primary Documents",
        "difficulty": 2,
        "description": "Create a Twine story that uses primary documents--pieces of writing or recordings made by people who experienced a particular event from the past--to help the reader discover information about an event from the past.",
        "path": "primary-documents",
        "locations": [
            "primary-documents-trailhead",
            "adding-images",
            "reveal-text",
            "formatting-links", // pre-requisite: linking passages
            "investigating-branches", // prerequisite: branching paths
            "primary-documents-landmark"
        ]
    }
    
]

export async function get() {
    return {
        body: { trails }
    }
}