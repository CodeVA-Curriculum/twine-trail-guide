const trails = [
    {
        "name": "Your First Story",
        "difficulty": 0,
        "description": "This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics!",
        "path": "your-first-story",
        "locations": [
            "start-a-story",
            "create-passage",
            "link-passages",
            "branching-paths",
            "story-with-multiple-endings",
            
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
    {
        "name": "Dungeon Crawler",
        "difficulty": 3,
        "description": "Create a text-based game where the reader explores a labrynthine maze, avoiding dangers and solving puzzles to fulfill their quest.",
        "path": "dungeon-crawler",
        "locations": [],
    },
    {
        "name": "Audio Fiction",
        "difficulty": 1,
        "description": "Create a story where the reader can listen to audio that you, as the author, create through interviews and field recordings.",
        "path": "audio-fiction",
        "locations": [],
    },
    {
        "name": "Historical Fiction",
        "difficulty": 1,
        "description": "Create a story based on a historical event or historical figure that lets the reader explore events from the past.",
        "path": "historical-fiction",
        "locations": [],
    },
    {
        "name": "Puzzle",
        "difficulty": 2,
        "description": "Use variables and conditional statements to create a story where the reader must solve a puzzle to move the plot forward.",
        "path": "puzzle",
        "locations": []
    },
    {
        "name": "Time Traveler",
        "difficulty": 2,
        "description": "Create a story about a time traveler who changes the past by interfering in events. Be sure to include what happens to the future because of their actions!",
        "path": 'time-traveler',
        "locations": []
    },
    {
        "name": "Chutes & Ladders",
        "difficulty": 2,
        "description": "Create a story where the reader makes choices. Store information about their choices in variables and use that information to determine if the story ends well or badly.",
        "path": "chutes-and-ladders",
        "locations": []
    }
    
]

export async function get() {
    return {
        body: { trails }
    }
}