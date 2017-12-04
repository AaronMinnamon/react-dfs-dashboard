import { normalize, schema } from 'normalizr';

// Define a users schema
const goalsFor = new schema.Entity('users');

// Define your comments schema
const goalsAgainst = new schema.Entity('comments', {
    commenter: user
});

// Define your article 
const game = new schema.Entity('articles', {
    author: user
});

const normalizedData = normalize(originalData, article);