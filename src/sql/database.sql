-- Create a table to store favorites.
-- id: Used as index when displaying data on list
-- title: Content's title/name
-- image_path: Path to content's image

CREATE TABLE IF NOT EXISTS favorites
(
    id INTEGER PRIMARY KEY,
    title VARCHAR NOT NULL,
    image_path VARCHAR NOT NULL,
    UNIQUE(id)
);