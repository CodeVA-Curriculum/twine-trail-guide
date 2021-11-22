const trails = [
    {
        "name": "Your First Story",
        "difficulty": 0,
        "description": "This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics!",
        "path": "your-first-story",
        "locations": [
            // "your-first-story-trailhead",
            "start-a-story",
            "create-passage",
            "link-passages",
            "branching-paths",
            "story-with-multiple-endings"
        ],
        // "standards": [
        //     {
        //         "content_area": "Computer Science",
        //         "standard_text": "Lorum ipsum sit dolor amet"
        //     }
        // ]
    },
    {
      "name": "Cover Art",
      "difficulty": 0,
      "description": "This trail is about embedding images, formatting text, and making your passages look amazing. Follow this trail to learn how to change the look of your story.",
      "path": "cover-art",
      "locations": [
  
      ]
    },
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
        "locations": [],
    },
    {
        "name": "Museum Walk",
        "difficulty": 2,
        "description": "Create a Twine story that lets the reader explore events from the past. Use images, recordings, and writing to help readers explore a place out of a different time.",
        "path": "museum-walk",
        "locations": []
    },
    // {
    //     "name": "Diary",
    //     "difficulty": 1,
    //     "description": "Lorum ipsum",
    //     "path": "diary",
    //     "locations": []
    // },
    // {
    //     "name": "Puzzle",
    //     "difficulty": 2,
    //     "description": "Use variables and conditional statements to create a story where the reader must solve a puzzle to move the plot forward.",
    //     "path": "puzzle",
    //     "locations": []
    // },
    // {
    //     "name": "Time Traveler",
    //     "difficulty": 2,
    //     "description": "Create a story about a time traveler who changes the past by interfering in events. Be sure to include what happens to the future because of their actions!",
    //     "path": 'time-traveler',
    //     "locations": []
    // },
    // {
    //     "name": "Chutes & Ladders",
    //     "difficulty": 2,
    //     "description": "Create a story where the reader makes choices. Store information about their choices in variables and use that information to determine if the story ends well or badly.",
    //     "path": "chutes-and-ladders",
    //     "locations": []
    // },
    {
        "name": "Primary Documents",
        "difficulty": 1,
        "description": "Create a Twine story that uses primary documents--pieces of writing or recordings made by people who experienced a particular event from the past--to help the reader explore the event associated with the documents.",
        "path": "primary-documents",
        "locations": [
            // "primary-documents-trailhead",
            // "adding-images",
            // "adding-recordings",
            // "reveal-text",
            "link-passages",
            // "formatting-links",
            "branching-paths",
            // "primary-documents-landmark"
        ]
    }
    
]

export async function get() {
    return {
        body: { trails }
    }
}