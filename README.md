# Cloud Ten

## Wireframes

[Project Whiteboard](https://projects.invisionapp.com/freehand/document/MnH9x9T1g)

[home page wireframe]

[calendar page wireframe]

[flash card page wireframe]

## User Stories

[Project Whiteboard](https://projects.invisionapp.com/freehand/document/MnH9x9T1g)

1. Calendar: As a busy user, I want to plan my time and track multiple tasks
    - Feature tasks: user can add to and remove from calendar, user can add items to to-do list and check them off (stretch: input box on calendar itself where they can add that day's tasks; user can choose color of task; user can choose whether calendar starts on Monday or Sunday (default is Sunday))
    - Acceptance tests: items added stay on calendar until removed (or until localStorage is cleared); checklist items stay until checked off; all items appear on the appropriate day; error message if item can't be saved
2. Flash Cards: As a busy user, I want to spend a little time each day learning
    - Feature tasks: user can view flashcards from chosen topic; user can click through flashcards in a carousel-type format (stretch: user can track score)
    - Acceptance tests: Flashcards display when they're supposed to and progress through the "stack" when clicked; flashcards go away when the user is done
3. Affirmation: As a user, I want to be motivated/affirmed when I visit the site
    - Feature tasks: When the site loads, an affirmation appears; affirmation is pulled from a pre-generated list
    - Acceptance tests: different affirmation displays on each page load, with fallback default affirmation
4. Contact Form: As a user, I want to be able to request tutoring
    - Feature tasks: user can send a message to site owner that includes user's contact info, a short message, and a requested tutoring topic
    - Acceptance tests: the form sends the info to the correct recipient; the form displays a confirmation (or error) message
5. Resources: As a user, I want to be able to find resources
    - Feature tasks: user can click links to visit educational/affirmational resources (stretch: only display a few links at a time so page isn't all links)
    - Acceptance tests: diverse list of resources to account for different users; all links work

## Domain Model

Each day is its own object; create a month's worth of "day" objects & then add tasks/events in arrays to append to day object.
Calendar month is also an object, populated with day objects. Calendar has its own properties (number of days, which weekday does the month start on). Days outside of the current month display as gray in the calendar.
